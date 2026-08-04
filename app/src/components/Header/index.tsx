import React from 'react';
import { View, Text, Pressable } from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

import { styles } from './styles';
import { useHeader } from './useHeader';

export default function Header() {
  const {
    colors,
    isDark,
    toggleTheme,
    displayName,
    greeting,
    locationName,
  } = useHeader();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View style={styles.titleContainer} pointerEvents="none">
          <Text style={[styles.greetingText, { color: colors.textSecondary }]}>
            {greeting},
          </Text>
          <Text style={[styles.title, { color: colors.textPrimary }]}>
            {displayName}
          </Text>

          <View style={styles.locationRow}>
            <FontAwesome6 name="location-crosshairs" size={12} iconStyle='solid' color={colors.primary} />
            <Text
              style={[styles.locationText, { color: colors.primary }]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {locationName}
            </Text>
          </View>
        </View>

        <View style={styles.actionsContainer}>

          <Pressable
            onPress={toggleTheme}
            style={({ pressed }) => [
              styles.themeButton,
              {
                backgroundColor: colors.primary + (isDark ? '14' : '0D'),
                borderColor: colors.primary + '40',
              },
              pressed && { opacity: 0.6 },
            ]}
            accessibilityRole="button"
            accessibilityLabel="Alternar tema"
          >
            <FontAwesome6
              name={isDark ? 'moon' : 'sun'}
              size={20}
              iconStyle='solid'
              color={colors.primary}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}