import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

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

    const navigation = useNavigation<any>();

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
                        <Feather name="map-pin" size={12} color={colors.primary} />
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
                        style={({ pressed }) => [
                            styles.themeButton,
                            {
                                backgroundColor: colors.background + (isDark ? '14' : '0D'),
                                borderColor: colors.background + '40',
                            },
                            pressed && { opacity: 0.6 },
                        ]}
                        accessibilityRole="button"
                        accessibilityLabel="Acessar diário de bordo"
                        onPress={() => navigation.navigate('FuelLog')}
                    >
                        <MaterialCommunityIcons name="car" size={24} color={colors.textSecondary} />
                    </Pressable>

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
                        <Feather
                            name={isDark ? 'moon' : 'sun'}
                            size={20}
                            color={colors.primary}
                        />
                    </Pressable>
                </View>

            </View>
        </View>
    );
}