import React from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Version from '../../components/Version';
import UserCard from '../../components/UserCard';
import { useUserCard } from '../../components/UserCard/useUserProfile';
import { useAppTheme } from '../../theme/ThemeProvider';
import { styles } from './styles';

export default function UserProfile() {
    const { colors } = useAppTheme();
    const navigation = useNavigation();

    const {
        userData,
        loading,
        token,
        request,
        promptAsync,
        handleLogout,
        handleMockLogin,
    } = useUserCard();

    return (
        <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={24} color={colors.textPrimary} />
                </TouchableOpacity>
                <Text
                    style={[styles.headerTitle, { color: colors.textPrimary }]}
                    onLongPress={__DEV__ ? handleMockLogin : undefined}
                >
                    Perfil
                </Text>
                <TouchableOpacity onPress={handleLogout}>
                    <Feather name="log-out" size={24} color={colors.textPrimary} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
                {loading ? (
                    <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
                ) : token ? (
                    <View>
                        <UserCard userData={userData} />
                    </View>
                ) : (
                    <View style={styles.guestContainer}>
                        <View style={[styles.guestIconContainer, { backgroundColor: colors.primary + '10' }]}>
                            <Feather name="lock" size={48} color={colors.primary} />
                        </View>
                        <Text style={[styles.guestTitle, { color: colors.textPrimary }]}>Seu Perfil</Text>
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
            </ScrollView>

            <Version />
            
        </SafeAreaView>
    );
}