import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '../../theme/ThemeProvider';
import { radius, spacing, typography } from '../../theme/tokens';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
    label: string;
    onPress: () => void;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    loading?: boolean;
    icon?: React.ReactNode;
    accessibilityLabel?: string;
}

/**
 * Botao base com estados de carregamento e variantes de cor.
 */
export function Button({
    label,
    onPress,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    icon,
    accessibilityLabel,
}: ButtonProps) {
    const { colors } = useAppTheme();
    const isDisabled = disabled || loading;

    const containerStyles = [
        styles.base,
        styles[size],
        styles[variant],
        isDisabled && styles.disabled,
        variant === 'primary' && { backgroundColor: colors.primary },
        variant === 'secondary' && { borderColor: colors.border, backgroundColor: colors.surface },
    ];

    const textColor = variant === 'primary' ? '#FFFFFF' : colors.textPrimary;

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={accessibilityLabel || label}
            onPress={onPress}
            disabled={isDisabled}
            style={({ pressed }) => [containerStyles, pressed && !isDisabled && styles.pressed]}
        >
            {loading ? (
                <ActivityIndicator color={textColor} />
            ) : (
                <View style={styles.content}>
                    {icon ? <View style={styles.icon}>{icon}</View> : null}
                    <Text style={[styles.label, { color: textColor }]}>{label}</Text>
                </View>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    base: {
        minHeight: 44,
        borderRadius: radius.md,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'transparent',
        paddingHorizontal: spacing.xl,
    },
    sm: {
        minHeight: 36,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
    },
    md: {
        paddingVertical: spacing.md,
    },
    lg: {
        paddingVertical: spacing.lg,
    },
    primary: {},
    secondary: {},
    ghost: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
    },
    disabled: {
        opacity: 0.6,
    },
    pressed: {
        opacity: 0.85,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    icon: {
        marginRight: 0,
    },
    label: {
        fontSize: typography.size.sm,
        fontWeight: typography.weight.bold,
        letterSpacing: typography.letterSpacing.tight,
    },
});
