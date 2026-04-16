import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as SecureStore from 'expo-secure-store';
import * as AuthSession from 'expo-auth-session';
import axios from 'axios';
import Constants from 'expo-constants';

import { useAppTheme } from '../../theme/ThemeProvider';

// Obrigatório para o fluxo de autenticação funcionar no mobile
WebBrowser.maybeCompleteAuthSession();

interface UserProfileModalProps {
    visible: boolean;
    onClose: () => void;
}

export default function UserProfileModal({ visible, onClose }: UserProfileModalProps) {
    const { colors, isDark } = useAppTheme();
    const [loading, setLoading] = useState(false);

    const [token, setToken] = useState<string | null>(null);
    const [userData, setUserData] = useState<{ primeiro_nome: string; ultimo_nome: string; foto: string } | null>(null);

    const redirectUri = AuthSession.makeRedirectUri({
        scheme: 'vaiabastecendo',
    });

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
        webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
        redirectUri: redirectUri,
    });

    // Função para buscar o usuário logado usando o token JWT
    const buscarDadosDoUsuario = async (jwtToken: string) => {
        try {
            const res = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/auth/me/`, {
                headers: {
                    Authorization: `Token ${jwtToken}` // É assim que provamos quem somos para o Django!
                }
            });
            setUserData(res.data);
        } catch (error) {
            console.error("Erro ao buscar dados do usuário:", error);
        }
    };

    // 1. O Hook que verifica o "Cofre" ao abrir o modal (O que havia sumido)
    useEffect(() => {
        if (visible) {
            SecureStore.getItemAsync('userToken').then(savedToken => {
                if (savedToken) {
                    setToken(savedToken);
                    buscarDadosDoUsuario(savedToken);
                }
            });
        }
    }, [visible]);

    // 2. O ÚNICO Hook que ouve o Google
    useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;
            console.log("🔑 MEU NOVO TOKEN FRESQUINHO:", authentication?.accessToken);
            
            // Quando quiser testar o fluxo completo de novo, basta descomentar as duas linhas abaixo:
            // if (authentication?.accessToken) {
            //     enviarTokenParaDjango(authentication.accessToken);
            // }
        } else if (response?.type === 'error' || response?.type === 'dismiss') {
            console.log("🚨 ERRO NO LOGIN:", response);
        }
    }, [response]);

    // 4. Valida com o Codespaces e guarda a chave final
    const enviarTokenParaDjango = async (googleToken: string) => {
        setLoading(true);
        try {
            const res = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/google/`, {
                access_token: googleToken
            });
            
            const jwtToken = res.data.key; // A chave gerada pelo dj-rest-auth
            await SecureStore.setItemAsync('userToken', jwtToken); // Guarda no cofre
            setToken(jwtToken);
            await buscarDadosDoUsuario(jwtToken);
        } catch (error) {
            console.error("Erro na validação do backend:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await SecureStore.deleteItemAsync('userToken');
        setToken(null);
        setUserData(null);
    };

    return (
        <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
            <View style={styles.overlay}>
                <View style={[styles.modalContainer, { backgroundColor: colors.surface }]}>
                    
                    {/* Cabeçalho */}
                    <View style={styles.header}>
                        <Text style={[styles.title, { color: colors.textPrimary }]}>Meu Perfil</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Feather name="x" size={24} color={colors.textSecondary} />
                        </TouchableOpacity>
                    </View>

                    {/* Conteúdo Dinâmico */}
                    <View style={styles.content}>
                        {loading ? (
                            <ActivityIndicator size="large" color={colors.primary} style={{ marginVertical: 20 }} />
                        ) : token ? (
                            // TELA DO USUÁRIO LOGADO
                            <View style={styles.loggedContainer}>
                                {userData?.foto ? (
                                    <Image
                                        source={{ uri: userData.foto }}
                                        style={[styles.avatarImage, { borderColor: colors.textPrimary }]}
                                    />
                                ) : (
                                    <View style={[styles.avatar, { backgroundColor: colors.primary + '20' }]}>
                                        <Feather name="user" size={40} color={colors.primary} />
                                    </View>
                                )}

                                <Text style={[styles.welcomeText, { color: colors.textPrimary }]}>
                                    Olá, {userData?.primeiro_nome ? `${userData.primeiro_nome} ${userData.ultimo_nome}` : 'Motorista'}!
                                </Text>

                                <Text style={[styles.subText, { color: colors.textSecondary }]}>
                                    Agora suas atualizações de preço têm mais credibilidade.
                                </Text>

                                <TouchableOpacity
                                    style={[styles.logoutButton, { borderColor: colors.danger }]}
                                    onPress={handleLogout}
                                >
                                    <Text style={[styles.logoutText, { color: colors.danger }]}>Sair da Conta</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            // TELA DE QUEM NÃO FEZ LOGIN
                            <View style={styles.guestContainer}>
                                <Text style={[styles.guestText, { color: colors.textSecondary }]}>
                                    Faça login para começar a contribuir com a comunidade e ganhar reputação!
                                </Text>
                                <TouchableOpacity 
                                    style={styles.googleButton} 
                                    activeOpacity={0.8}
                                    disabled={!request}
                                    onPress={() => promptAsync()}
                        
                                >
                                    <FontAwesome5 name="google" size={18} color="#FFF" />
                                    <Text style={styles.googleButtonText}>Entrar com Google</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    content: {
        alignItems: 'center',
    },
    guestContainer: {
        alignItems: 'center',
        width: '100%',
    },
    guestText: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 20,
    },
    googleButton: {
        backgroundColor: '#DB4437', // Cor oficial do Google
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingVertical: 14,
        borderRadius: 12,
        gap: 12,
    },
    googleButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loggedContainer: {
        alignItems: 'center',
        width: '100%',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    avatarImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E5E5E5',
    },
    welcomeText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subText: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 24,
    },
    logoutButton: {
        borderWidth: 1,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
    },
    logoutText: {
        fontWeight: 'bold',
    }
});