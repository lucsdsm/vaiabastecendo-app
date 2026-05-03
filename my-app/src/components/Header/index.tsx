import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useHeader } from './useHeader';
import { styles } from './styles';

import { useUserProfile } from '../UserProfileModal/useUserProfile';

/**
 * Header principal da aplicacao.
 * Exibe marca, titulo centralizado e controle manual de tema.
*/
export default function Header() {
    const { colors, isDark, toggleTheme, statusBarHeight } = useHeader();

    return (
        <View style={[
            styles.container,
            {
                backgroundColor: colors.background,
                paddingTop: statusBarHeight + 15,
                borderBottomLeftRadius: 24,
                borderBottomRightRadius: 24
            }
        ]}>
            <View style={styles.content}>
                <View style={styles.titleContainer} pointerEvents="none">
                    <Text style={[styles.title, { color: colors.primary }]}>
                        Olá, {useUserProfile().userData?.primeiro_nome || 'Motorista'}!
                        
                        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                            {'\n'}Encontre os melhores preços de combustíveis perto de você.
                        </Text>
                    </Text>
                    
                </View>

                <TouchableOpacity 
                    onPress={toggleTheme} 
                    activeOpacity={0.3}
                    style={styles.themeButton}>
                    <Feather 
                        name={isDark ? "moon" : "sun"} 
                        size={24} 
                        color={colors.textSecondary}
                        style={{ marginRight: 15 }} 
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
};

