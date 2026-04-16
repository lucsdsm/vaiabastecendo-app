import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import { useEmptyState } from './useEmptyState';

interface EmptyStateProps {
  message?: string;
  onRetry?: () => void;
}

/**
 * Estado vazio para falha de conectividade com opcao de nova tentativa.
 */
export default function EmptyState({ 
    message = 'Não foi possível conectar-se ao servidor no momento.', 
    onRetry }: 
        EmptyStateProps) {
            const { colors, isDark } = useEmptyState();

            return (
        <View style={[styles.container, { 
            backgroundColor: colors.surface,
            borderColor: colors.danger + '40'
        }]}>
            <View style={[styles.iconContainer, { backgroundColor: colors.danger + (isDark ? '33' : '1A') }]}>
                <Feather name="wifi-off" size={32} color={colors.danger} />
            </View>
            
            <Text style={[styles.title, { color: colors.textPrimary }]}>
                Servidor Indisponível
            </Text>
            
            <Text style={[styles.message, { color: colors.textSecondary }]}>
                {message}
            </Text>

            <TouchableOpacity 
                style={[styles.button, { backgroundColor: colors.primary }]} 
                onPress={onRetry}
                activeOpacity={0.8}
            >
                <Feather name="refresh-cw" size={16} color="#FFF" />
                <Text style={styles.buttonText}>Tentar Novamente</Text>
            </TouchableOpacity>
        </View>
    );
}
