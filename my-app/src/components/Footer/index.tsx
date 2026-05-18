import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';

import { styles } from './styles';
import { useFooter } from './useFooter';

import { useAuth } from '../../contexts/AuthContext';

/**
 * Footer principal da aplicacao.
 * Mantem a acao primaria em destaque no centro para facilitar uso com uma mao.
*/
export default function Footer() {
    const {
        userData,
        colors,
        activeRoute,
        handleOpenMap,
    } = useFooter();

    const navigation = useNavigation<any>(); 
    const isHomeActive = activeRoute === 'Home';
    const isProfileActive = activeRoute === 'UserProfile';
    const activeColor = colors.primary;
    const inactiveColor = colors.textSecondary;

    return ( 
        <View style={[
            styles.container,
            {
                backgroundColor: colors.surface,
            }
        ]}>
            <View style={styles.content}>
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.6}
                    accessibilityRole="button"
                    accessibilityLabel="Abrir mapa"
                    onPress={handleOpenMap}
                >
                    <Feather name="map" size={22} color={isHomeActive ? activeColor : inactiveColor} />
                    <Text style={[styles.label, { color: isHomeActive ? activeColor : inactiveColor }]}>
                        Mapa
                    </Text>
                </TouchableOpacity>

                <View style={styles.centerButtonWrapper}>
                    <TouchableOpacity 
                        style={[styles.centerButton, { backgroundColor: colors.primary }]} 
                        activeOpacity={0.8}
                        accessibilityRole="button"
                        accessibilityLabel="Atualizar preco"
                    >
                        <Feather name="plus" size={26} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={[styles.centerLabel, { color: colors.textSecondary }]}>Atualizar</Text>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.6}

                    onPress={() => navigation.navigate('UserProfile')} 
                    accessibilityRole="button"
                    accessibilityLabel="Ir para perfil"
                >
                    <Feather name="user" size={22} color={isProfileActive ? activeColor : inactiveColor} />
                    <Text style={[styles.label, { color: isProfileActive ? activeColor : inactiveColor }]}>Perfil</Text>
                </TouchableOpacity>
                
            </View>
        </View>
    );
}
