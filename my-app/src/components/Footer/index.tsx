import React from 'react';
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import { useAppTheme } from '../../theme/ThemeProvider';
import { Feather } from '@expo/vector-icons';

/**
 * Footer principal da aplicacao.
 * Mantem a acao primaria em destaque no centro para facilitar uso com uma mao.
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
                <TouchableOpacity style={styles.button} activeOpacity={0.6}>
                    <Feather name="map" size={24} color={colors.textSecondary} />
                </TouchableOpacity>

                {/* <TouchableOpacity style={styles.button} activeOpacity={0.6}>
                    <Feather name="award" size={24} color={colors.textSecondary} />
                </TouchableOpacity> */}

                <TouchableOpacity 
                    style={[styles.centerButton, { backgroundColor: colors.primary }]} 
                    activeOpacity={0.8}
                >
                    <Feather name="plus" size={28} color="#FFFFFF" />
                </TouchableOpacity>

                {/* <TouchableOpacity style={styles.button} activeOpacity={0.6}>
                    <Feather name="bell" size={24} color={colors.textSecondary} />
                </TouchableOpacity> */}

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