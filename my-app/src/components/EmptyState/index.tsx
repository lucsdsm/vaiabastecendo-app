import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import { useEmptyState } from './useEmptyState';
import { useAppTheme } from '../../theme/ThemeProvider';
import { radius, spacing, typography } from '../../theme/tokens';

interface EmptyStateProps {
    title?: string;
    message?: string;
    iconName?: keyof typeof Feather.glyphMap;
    onRetry?: () => void;
    buttonText?: string;
}

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
function Button({
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
        localStyles.base,
        localStyles[size],
        localStyles[variant],
        isDisabled && localStyles.disabled,
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
            style={({ pressed }) => [containerStyles, pressed && !isDisabled && localStyles.pressed]}
        >
            {loading ? (
                <ActivityIndicator color={textColor} />
            ) : (
                <View style={localStyles.content}>
                    {icon ? <View style={localStyles.icon}>{icon}</View> : null}
                    <Text style={[localStyles.label, { color: textColor }]}>{label}</Text>
                </View>
            )}
        </Pressable>
    );
}

/**
 * Estado vazio para falha de conectividade com opcao de nova tentativa .
 */
export default function EmptyState({ 
    title = 'Servidor Indisponível',
    message = 'Não foi possível conectar-se ao servidor no momento.', 
    iconName = 'wifi-off',
    buttonText = 'Tentar Novamente',
    onRetry 
}: EmptyStateProps) {
    const { colors, isDark } = useEmptyState();

    return (
        <View style={[styles.container, { 
            backgroundColor: colors.background,
        }]}>
            <View style={[styles.iconContainer, { backgroundColor: colors.danger + (isDark ? '33' : '1A') }]}>
                <Feather name={iconName} size={32} color={colors.danger} />
            </View>
            
            <Text style={[styles.title, { color: colors.textPrimary }]}>
                {title}
            </Text>
            
            <Text style={[styles.message, { color: colors.textSecondary }]}>
                {message}
            </Text>

            {/* Renderiza o botão apenas se a função onRetry for passada */}
            {onRetry && (
                <Button
                    label={buttonText}
                    onPress={onRetry}
                    icon={<Feather name="refresh-cw" size={16} color="#FFF" />}
                    accessibilityLabel={buttonText}
                />
            )}
        </View>
    );
}

const localStyles = StyleSheet.create({
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
