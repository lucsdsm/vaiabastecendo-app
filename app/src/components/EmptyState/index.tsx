import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import { useAppTheme } from '../../theme/ThemeProvider';

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

/**
 * Estado vazio para falha de conectividade com opcao de nova tentativa .
 */
export default function EmptyState({ 
    title = 'Dados Indisponíveis',
    message = 'Não foi possível receber os dados dos postos no momento.', 
    iconName = 'wifi-off',
    buttonText = 'Tentar Novamente',
    onRetry 
}: EmptyStateProps) {
    const { colors, isDark } = useAppTheme();

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
