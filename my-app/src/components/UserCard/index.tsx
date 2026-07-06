import React, { useMemo } from 'react';
import { View, Text, Image } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';

import { useAppTheme } from '../../theme/ThemeProvider';
import { styles } from './styles';

type UserCardData = {
    foto?: string | null;
    username?: string | null;
    verificado?: boolean;
    likes_recebidos?: number | null;
    likes_deferidos?: number | null;
    pontos?: number | null;
};

type UserCardProps = {
    userData?: UserCardData | null;
};

export default function UserCard({ userData }: UserCardProps) {
    const { colors, isDark } = useAppTheme();

    const points = userData?.pontos || 0;
    const totalRequired = 100;
    const isVerified = userData?.verificado || points >= totalRequired;

    const percentage = useMemo(() => {
        return Math.min(1, points / totalRequired);
    }, [userData?.pontos, totalRequired]);

    return (
        <View style={styles.cardWrapper}>
            {/* Bloco Superior: Foto e Estatísticas */}
            <View style={styles.profileSection}>
                {userData?.foto ? (
                    <Image source={{ uri: userData.foto }} style={styles.avatar} />
                ) : (
                    <View style={[styles.avatarPlaceholder, { backgroundColor: colors.primary + '20' }]}>
                        <Feather name="user" size={40} color={colors.primary} />
                    </View>
                )}

                <View style={styles.infoSection}>
                    <View style={styles.nameContainer}>
                        <Text style={[styles.usernameText, { color: colors.textPrimary }]}>
                            {userData?.username ? userData.username : 'Motorista'}
                        </Text>
                    </View>

                    <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                            <Text style={[styles.statNumber, { color: colors.textPrimary }]}>
                                {userData?.likes_recebidos || 0}
                            </Text>
                            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Recebidas</Text>
                        </View>

                        <View style={styles.statItem}>
                            <Text style={[styles.statNumber, { color: colors.textPrimary }]}>
                                {userData?.likes_deferidos || 0}
                            </Text>
                            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Deferidas</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Bloco Inferior: Gamificação (Progresso do Selo) Embutida */}
            <View style={styles.progressSection}>
                {isVerified ? (
                    <View style={[styles.badgeContainer, { backgroundColor: colors.primary + (isDark ? '1A' : '0A'), borderColor: colors.primary + '30' }]}>
                        <View style={styles.row}>
                            <MaterialIcons 
                                name="verified" 
                                size={18} 
                                color={colors.primary} 
                            />
                            <Text style={[styles.badgeText, { color: colors.primary }]}>
                                Motorista Verificado
                            </Text>
                        </View>
                        <Text style={[styles.badgeSubtext, { color: colors.textSecondary }]}>
                            Obrigado por sua dedicação à comunidade!
                        </Text>
                    </View>
                ) : (
                    <View style={styles.progressContainer}>
                        <View style={styles.headerRow}>
                            <Text style={[styles.progressTitle, { color: colors.textPrimary }]}>
                                Caminho para a Verificação
                            </Text>
                            <Text style={[styles.counter, { color: colors.textSecondary }]}>
                                {userData?.pontos} / {totalRequired} curtidas
                            </Text>
                        </View>

                        <View style={[styles.progressBarTrack, { backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)' }]}>
                            <View 
                                style={[
                                    styles.progressBarFill, 
                                    { 
                                        backgroundColor: colors.primary,
                                        width: `${percentage * 100}%` 
                                    }
                                ]} 
                            />
                        </View>

                        <Text style={[styles.helpText, { color: colors.textSecondary }]}>
                            Complete {totalRequired} curtidas recebidas para ganhar o selo e ser uma autoridade!
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
}