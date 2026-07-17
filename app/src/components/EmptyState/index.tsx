import React from 'react';
import { ActivityIndicator, Pressable, Text, View, StyleProp, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import { useAppTheme } from '../../theme/ThemeProvider';

interface EmptyStateProps {
    title?: string;
    message?: string;
    iconName?: keyof typeof Feather.glyphMap;
    customIcon?: React.ReactNode;
    onRetry?: () => void;
    buttonText?: string;
    variant?: 'error' | 'neutral' | 'primary'; 
    style?: StyleProp<ViewStyle>;
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

function Button({
    label, onPress, variant = 'primary', size = 'md',
    disabled = false, loading = false, icon, accessibilityLabel,
}: ButtonProps) {
    const { colors } = useAppTheme();
    const isDisabled = disabled || loading;

    const containerStyles = [
        styles.buttonBase,
        styles[`button${size.toUpperCase()}` as 'buttonSM' | 'buttonMD' | 'buttonLG'],
        styles[`button${variant.toUpperCase()}` as 'buttonPRIMARY' | 'buttonSECONDARY' | 'buttonGHOST'],
        isDisabled && styles.buttonDisabled,
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
            style={({ pressed }) => [containerStyles, pressed && !isDisabled && styles.buttonPressed]}
        >
            {loading ? (
                <ActivityIndicator color={textColor} />
            ) : (
                <View style={styles.buttonContent}>
                    {icon ? <View style={styles.buttonIcon}>{icon}</View> : null}
                    <Text style={[styles.buttonLabel, { color: textColor }]}>{label}</Text>
                </View>
            )}
        </Pressable>
    );
}

export default function EmptyState({ 
    title = 'Dados Indisponíveis',
    message = 'Não foi possível receber os dados no momento.', 
    iconName = 'wifi-off',
    customIcon,
    buttonText = 'Tentar Novamente',
    onRetry,
    variant = 'error',
    style
}: EmptyStateProps) {
    const { colors, isDark } = useAppTheme();

    const getVariantColors = () => {
        switch (variant) {
            case 'neutral':
                return { bg: colors.textSecondary + (isDark ? '33' : '1A'), icon: colors.textSecondary };
            case 'primary':
                return { bg: colors.primary + (isDark ? '33' : '1A'), icon: colors.primary };
            case 'error':
            default:
                return { bg: colors.danger + (isDark ? '33' : '1A'), icon: colors.danger };
        }
    };

    const variantColors = getVariantColors();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }, style]}>
            <View style={[styles.iconContainer, { backgroundColor: variantColors.bg }]}>
                {customIcon ? (
                    customIcon
                ) : (
                    <Feather name={iconName} size={32} color={variantColors.icon} />
                )}
            </View>
            
            <Text style={[styles.title, { color: colors.textPrimary }]}>
                {title}
            </Text>
            
            <Text style={[styles.message, { color: colors.textSecondary }]}>
                {message}
            </Text>

            {onRetry && (
                <View>
                    <Button
                        label={buttonText}
                        onPress={onRetry}
                        icon={<Feather name="refresh-cw" size={16} color="#FFF" />}
                        accessibilityLabel={buttonText}
                    />
                </View>
            )}
        </View>
    );
}