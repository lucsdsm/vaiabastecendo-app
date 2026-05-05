import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppTheme } from '../../theme/ThemeProvider';
import { useUserProfile } from './useUserProfile';
import { styles } from './styles';

export default function UserProfileScreen() {
    const { colors } = useAppTheme();
    
    const { 
        userData, 
        loading, 
        token, 
        request, 
        promptAsync, 
        handleLogout,
        handleMockLogin
    } = useUserProfile();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Header */}
            <View style={styles.header}>
                <Text 
                    style={[styles.headerTitle, { color: colors.textPrimary }]}
                    onLongPress={__DEV__ ? handleMockLogin : undefined}
                >
                    Perfil
                </Text>
                <TouchableOpacity>
                    <Feather name="settings" size={24} color={colors.textPrimary} />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                {loading ? (
                    <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
                ) : token ? (
                    <View style={styles.loggedContainer}>
                        
                        {/* Seção de Perfil (Foto + Infos lado a lado) */}
                        <View style={styles.profileSection}>
                            {userData?.foto ? (
                                <Image
                                    source={{ uri: userData.foto }}
                                    style={[styles.avatar]}
                                />
                            ) : (
                                <View style={[styles.avatarPlaceholder, { backgroundColor: colors.primary + '20' }]}>
                                    <Feather name="user" size={40} color={colors.primary} />
                                </View>
                            )}

                            <View style={styles.infoSection}>
                                <Text style={[styles.usernameText, { color: colors.textPrimary }]}>
                                    {userData?.username 
                                        ? userData.username
                                        : 'Motorista'}
                                </Text>

                                {/* Estatísticas de Curtidas */}
                                <View style={styles.statsContainer}>
                                    <View style={styles.statItem}>
                                        <Text style={[styles.statNumber, { color: colors.textPrimary }]}>
                                            {userData?.likes_recebidos || 0}
                                        </Text>
                                        <Text style={[styles.statLabel, { color: colors.textSecondary }]}> Recebidas </Text>
                                    </View>
                                    
                                    <View style={styles.statItem}>
                                        <Text style={[styles.statNumber, { color: colors.textPrimary }]}>
                                            {userData?.likes_dados || 0}
                                        </Text>
                                        <Text style={[styles.statLabel, { color: colors.textSecondary }]}> Deferidas </Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* <Text style={[styles.bioText, { color: colors.textSecondary }]}>
                            Membro da comunidade ajudando a monitorar os preços dos combustíveis.
                        </Text> */}

                        {/* Botão de Ação Estilo Instagram (Editar/Sair) */}
                        <TouchableOpacity
                            style={[styles.actionButton, { borderColor: colors.border || '#ccc' }]}
                            onPress={handleLogout}
                        >
                            <Text style={[styles.actionButtonText, { color: colors.textPrimary }]}>Sair da Conta</Text>
                        </TouchableOpacity>

                    </View>
                ) : (
                    // Login não realizado
                    <View style={styles.guestContainer}>
                        <View style={[styles.guestIconContainer, { backgroundColor: colors.primary + '10' }]}>
                            <Feather name="lock" size={48} color={colors.primary} />
                        </View>
                        <Text style={[styles.guestTitle, { color: colors.textPrimary }]}>
                            Seu Perfil
                        </Text>
                        <Text style={[styles.guestText, { color: colors.textSecondary }]}>
                            Faça login para acompanhar suas curtidas, ganhar reputação e contribuir com a comunidade!
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
        </SafeAreaView>
    );
}