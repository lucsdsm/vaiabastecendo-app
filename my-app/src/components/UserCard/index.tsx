import React from 'react';
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
};

type UserCardProps = {
    userData?: UserCardData | null;
};

export default function UserCard({ userData }: UserCardProps) {
    const { colors } = useAppTheme();

    return (
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

                    {userData?.verificado && (
                        <MaterialIcons
                            name="verified"
                            size={24}
                            color={colors.primary}
                            style={styles.verifiedIcon}
                        />
                    )}
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
    );
}