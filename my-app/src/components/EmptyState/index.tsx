import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import { useEmptyState } from './useEmptyState';
import { Button } from '../ui';

interface EmptyStateProps {
    title?: string;
    message?: string;
    iconName?: keyof typeof Feather.glyphMap;
    onRetry?: () => void;
    buttonText?: string;
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
