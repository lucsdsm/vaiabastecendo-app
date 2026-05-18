import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { useAppTheme } from '../../theme/ThemeProvider';
import { radius, spacing } from '../../theme/tokens';

interface CardProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}

/**
 * Container base para superficies elevadas.
 */
export function Card({ children, style }: CardProps) {
    const { colors } = useAppTheme();

    return (
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }, style]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: radius.xl,
        padding: spacing.lg,
        borderWidth: 1,
    },
});
