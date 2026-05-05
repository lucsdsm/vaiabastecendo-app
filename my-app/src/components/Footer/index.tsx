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
    } = useFooter();

    const navigation = useNavigation<any>(); 

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
                    <Text style={[styles.label, { color: colors.textSecondary }]}> Mapa </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.centerButton, { backgroundColor: colors.primary }]} 
                    activeOpacity={0.8}
                >
                    <Feather name="plus" size={28} color="#FFFFFF" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.6}

                    onPress={() => navigation.navigate('UserProfile')} 
                >
                    <Feather name="user" size={24} color={colors.textSecondary} />
                    <Text style={[styles.label, { color: colors.textSecondary }]}> Perfil </Text>
                </TouchableOpacity>
                
            </View>
        </View>
    );
}
