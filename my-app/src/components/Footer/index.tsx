import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import UserProfileModal from '../UserProfileModal';
import { styles } from './styles';
import { useFooter } from './useFooter';

/**
 * Footer principal da aplicacao.
 * Mantem a acao primaria em destaque no centro para facilitar uso com uma mao.
*/
export default function Footer() {
    const {
        colors,
        profileModalVisible,
        openProfileModal,
        closeProfileModal,
    } = useFooter();

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

                <TouchableOpacity 
                    style={[styles.centerButton, { backgroundColor: colors.primary }]} 
                    activeOpacity={0.8}
                >
                    <Feather name="plus" size={28} color="#FFFFFF" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.6}
                    onPress={openProfileModal}
                >
                    <Feather name="user" size={24} color={colors.textSecondary} />
                </TouchableOpacity>

                <UserProfileModal 
                    visible={profileModalVisible} 
                    onClose={closeProfileModal}
                />
                
            </View>
        </View>
    );
}
