import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { radius, spacing, typography } from '../../theme/tokens';

interface BadgeProps {
    label: string;
    color: string;
    textColor?: string;
    icon?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}

/**
 * Badge compacto para informacoes auxiliares.
 */
export function Badge({ label, color, textColor = '#111111', icon, style }: BadgeProps) {
    return (
        <View style={[styles.badge, { backgroundColor: color }, style]}>
            <View style={styles.content}>
                {icon ? <View style={styles.icon}>{icon}</View> : null}
                <Text style={[styles.text, { color: textColor }]}>{label}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    badge: {
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: radius.pill,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: typography.size.xs,
        fontWeight: typography.weight.semibold,
    },
});
