import React, { useMemo } from 'react';
import { View, Text, Image } from 'react-native';

import { useAppTheme } from '@theme/ThemeProvider';

import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

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
  const { colors } = useAppTheme();

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

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        {userData?.photo ? (
          <Image source={{ uri: userData.photo }} style={styles.avatar} />
        ) : (
          <View
            style={[
              styles.placeholder,
              { backgroundColor: colors.primary + '20' },
            ]}
          >
            <FontAwesome6 name="user" size={40} iconStyle='solid' color={colors.primary} />
          </View>
        )}

        <View style={styles.info}>
          <View style={styles.name}>
            <Text style={[styles.username, { color: colors.textPrimary }]}> 
              {displayName}
            </Text>
          </View>

          <View style={styles.stats}>
            <View style={styles.item}>
              <Text style={[styles.number, { color: colors.textPrimary }]}> 
                {likesReceived}
              </Text>
              <Text style={[styles.label, { color: colors.textSecondary }]}> 
                Recebidas
              </Text>
            </View>

            <View style={styles.item}>
              <Text style={[styles.number, { color: colors.textPrimary }]}> 
                {likesGiven}
              </Text>
              <Text style={[styles.label, { color: colors.textSecondary }]}> 
                Enviadas
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}