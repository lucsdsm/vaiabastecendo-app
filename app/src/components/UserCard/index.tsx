import React, { useMemo } from 'react';
import { View, Text, Image } from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

import { useAppTheme } from '../../theme/ThemeProvider';
import { styles } from './styles';

export interface UserCardData {
  photo?: string | null;
  username?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  verified?: boolean;
  likes_received?: number | null;
  likes_given?: number | null;
}

interface UserCardProps {
  userData?: UserCardData | null;
}

export default function UserCard({ userData }: UserCardProps) {
  const { colors, isDark } = useAppTheme();

  const totalRequired = 100;
  const isVerified = userData?.verified;

  const displayName = useMemo(() => {
    const firstName = userData?.first_name?.trim() ?? '';
    const lastName = userData?.last_name?.trim() ?? '';
    const fullName = `${firstName} ${lastName}`.trim();

    if (fullName) {
      return fullName;
    }

    return userData?.username?.trim() || 'Motorista';
  }, [userData?.first_name, userData?.last_name, userData?.username]);

  const likesReceived = userData?.likes_received ?? 0;
  const likesGiven = userData?.likes_given ?? 0;

  const percentage = useMemo(() => {
    return Math.min(1, likesReceived / totalRequired);
  }, [likesReceived, totalRequired]);

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        {userData?.photo ? (
          <Image source={{ uri: userData.photo }} style={styles.avatar} />
        ) : (
          <View
            style={[
              styles.avatarPlaceholder,
              { backgroundColor: colors.primary + '20' },
            ]}
          >
            <FontAwesome6 name="user" size={40} iconStyle='solid' color={colors.primary} />
          </View>
        )}

        <View style={styles.infoSection}>
          <View style={styles.nameContainer}>
            <Text style={[styles.usernameText, { color: colors.textPrimary }]}> 
              {displayName}
            </Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: colors.textPrimary }]}> 
                {likesReceived}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}> 
                Recebidas
              </Text>
            </View>

            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: colors.textPrimary }]}> 
                {likesGiven}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}> 
                Enviadas
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}