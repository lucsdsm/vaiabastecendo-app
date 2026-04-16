import React from 'react';
import { Modal, View, Text, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';

import { useAppTheme } from '../../theme/ThemeProvider';
import { useUserProfile } from './useUserProfile';
import { styles } from './styles';

interface UserProfileModalProps {
    visible: boolean;
    onClose: () => void;
}

/**
 * Modal de perfil com estados de visitante e usuario autenticado.
 */
export default function UserProfileModal({ visible, onClose }: UserProfileModalProps) {
    const { colors } = useAppTheme();
    
    const { 
        userData, 
        loading, 
        token, 
        request, 
        promptAsync, 
        handleLogout 
    } = useUserProfile(visible);

    return (
        <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
            <View style={styles.overlay}>
                <View style={[styles.modalContainer, { backgroundColor: colors.surface }]}>
                    <View style={styles.header}>
                        <Text style={[styles.title, { color: colors.textPrimary }]}>Meu Perfil</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Feather name="x" size={24} color={colors.textSecondary} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.content}>
                        {loading ? (
                            <ActivityIndicator size="large" color={colors.primary} style={{ marginVertical: 20 }} />
                        ) : token ? (
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