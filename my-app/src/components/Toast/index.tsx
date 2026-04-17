import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useToast } from '../../contexts/ToastContext';
import { useAppTheme } from '../../theme/ThemeProvider'; 

export function Toast() {
    const { toastData, hideToast } = useToast();
    const { colors } = useAppTheme();
    
    // Posição inicial: -100px (escondido acima da tela)
    const translateY = useRef(new Animated.Value(-100)).current;

    useEffect(() => {
        if (toastData.visible) {
            // Anima para descer (posição 50 na tela)
            Animated.spring(translateY, {
                toValue: 50, 
                useNativeDriver: true,
                speed: 12,
            }).start();

            // Agenda para subir e sumir depois de 3 segundos
            const timer = setTimeout(() => {
                hideToast();
            }, 3000);

            return () => clearTimeout(timer);
        } else {
            // Anima para subir (volta pro -100)
            Animated.timing(translateY, {
                toValue: -100,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [toastData.visible, hideToast, translateY]);

    // Define cores e ícones baseados no tipo
    const getToastStyle = () => {
        switch (toastData.type) {
            case 'success': return { bg: colors.success, icon: 'check-circle' };
            case 'danger': return { bg: colors.danger, icon: 'alert-circle' };
            default: return { bg: colors.info, icon: 'info' };
        }
    };

    const { bg, icon } = getToastStyle();

    return (
        <Animated.View 
            style={[
                styles.container, 
                { backgroundColor: bg, transform: [{ translateY }] }
            ]}
        >
            <Feather name={icon as any} size={20} color="#FFF" />
            <Text style={styles.message}>{toastData.message}</Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 20,
        right: 20,
        padding: 16,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 5, // Sombra Android
        shadowColor: '#000', // Sombra iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        zIndex: 9999, // Garante que fique por cima de TUDO
    },
    message: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: '600',
        marginLeft: 10,
        flex: 1,
    }
});