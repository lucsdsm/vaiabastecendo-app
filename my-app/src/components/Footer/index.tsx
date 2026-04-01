import React from 'react';
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import { useAppTheme } from '../../theme/ThemeProvider';
import { Feather } from '@expo/vector-icons';

/**
 * Footer da aplicacao com navegação principal.
 * Contem botões para Mapa, Ranking, Informar Preço (central destacado), Alertas e Perfil.
 */

export default function Footer() {
    const { colors, isDark } = useAppTheme();

    return (
        <View style={[
            styles.container,
            {
                backgroundColor: colors.surface,
            }
        ]}>
            <View style={styles.content}>
                
                {/* Botão Mapa */}
                <TouchableOpacity style={styles.button} activeOpacity={0.6}>
                    <Feather name="map" size={24} color={colors.textSecondary} />
                </TouchableOpacity>

                {/* Botão Ranking */}
                {/* <TouchableOpacity style={styles.button} activeOpacity={0.6}>
                    <Feather name="award" size={24} color={colors.textSecondary} />
                </TouchableOpacity> */}

                {/* Botão Central Destacado - Informar Preço */}
                <TouchableOpacity 
                    style={[styles.centerButton, { backgroundColor: colors.primary }]} 
                    activeOpacity={0.8}
                >
                    <Feather name="plus" size={28} color="#FFFFFF" />
                </TouchableOpacity>

                {/* Botão Favoritos ou Alertas (opcional) */}
                {/* <TouchableOpacity style={styles.button} activeOpacity={0.6}>
                    <Feather name="bell" size={24} color={colors.textSecondary} />
                </TouchableOpacity> */}

                {/* Botão Perfil */}
                <TouchableOpacity style={styles.button} activeOpacity={0.6}>
                    <Feather name="user" size={24} color={colors.textSecondary} />
                </TouchableOpacity>
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',

        paddingBottom: Platform.OS === 'ios' ? 30 : 20, 
        paddingTop: 15,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,

        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -2 }, 
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 8, 
            },
        }),
        zIndex: 10,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-around', 
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    button: {
        padding: 10,
    },
    centerButton: {
        width: 56,
        height: 56,
        borderRadius: 28, 
        justifyContent: 'center',
        alignItems: 'center',

        marginTop: -20, 
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
            },
            android: {
                elevation: 6,
            },
        }),
    }
});