import React, { useMemo } from 'react';
import { View, Text, Image } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';

import { useAppTheme } from '../../theme/ThemeProvider';
import { styles } from './styles';

export interface UserCardData {
  photo?: string | null;
  username?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  verified?: boolean;
  likesReceived?: number | null;
  likesGiven?: number | null;
  points?: number | null;
}

interface UserCardProps {
  userData?: UserCardData | null;
}

export default function UserCard({ userData }: UserCardProps) {
  const { colors, isDark } = useAppTheme();

  const points = userData?.points ?? 0;
  const totalRequired = 100;
  const isVerified = userData?.verified ?? points >= totalRequired;

  const displayName = useMemo(() => {
    const firstName = userData?.first_name?.trim() ?? '';
    const lastName = userData?.last_name?.trim() ?? '';
    const fullName = `${firstName} ${lastName}`.trim();

    if (fullName) {
      return fullName;
    }

    return userData?.username?.trim() || 'Motorista';
  }, [userData?.first_name, userData?.last_name, userData?.username]);

  const likesReceived = userData?.likesReceived ?? 0;
  const likesGiven = userData?.likesGiven ?? 0;

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
            <Feather name="user" size={40} color={colors.primary} />
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

      <View style={styles.progressSection}>
        {isVerified ? (
          <View
            style={[
              styles.badgeContainer,
              {
                backgroundColor: colors.primary + (isDark ? '1A' : '0A'),
                borderColor: colors.primary + '30',
              },
            ]}
          >
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
                Caminho para a verificação
              </Text>
              <Text style={[styles.counter, { color: colors.textSecondary }]}> 
                {likesReceived} / {totalRequired} curtidas
              </Text>
            </View>

            <View
              style={[
                styles.progressBarTrack,
                {
                  backgroundColor: isDark
                    ? 'rgba(255,255,255,0.08)'
                    : 'rgba(0,0,0,0.04)',
                },
              ]}
            >
              <View
                style={[
                  styles.progressBarFill,
                  {
                    backgroundColor: colors.primary,
                    width: `${percentage * 100}%`,
                  },
                ]}
              />
            </View>

            <Text style={[styles.helpText, { color: colors.textSecondary }]}> 
              Receba {totalRequired} curtidas para ganhar o selo e se tornar uma
              referência na comunidade.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}