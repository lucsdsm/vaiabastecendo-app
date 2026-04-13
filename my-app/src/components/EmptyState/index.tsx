import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAppTheme } from '../../theme/ThemeProvider';

interface EmptyStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function EmptyState({ 
    message = 'Não foi possível conectar-se ao servidor no momento.', 
    onRetry }: 
        EmptyStateProps) {
            const { colors, isDark } = useAppTheme();

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 16,
        padding: 24,
        borderRadius: 16,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    message: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 20,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 12,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: 'bold',
    }
});
