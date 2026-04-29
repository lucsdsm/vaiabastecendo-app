import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useHeader } from './useHeader';
import { styles } from './styles';

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
                backgroundColor: colors.surface,
                paddingTop: statusBarHeight + 15,
                borderBottomLeftRadius: 24,
                borderBottomRightRadius: 24
            }
        ]}>
            <View style={styles.content}>
                <View style={styles.titleContainer} pointerEvents="none">
                    <Text style={[styles.title, { color: colors.textPrimary }]}>
                        Vai
                        <Text style={[styles.subtitle, { color: colors.textPrimary }]}>
                        Abastecendo </Text>
                    </Text>
                    
                </View>

                {/* <Image 
                    source={require('../../../assets/adaptive-icon.png')} 
                    style={styles.logo} 
                    resizeMode="contain"
                /> */}

                <TouchableOpacity 
                    onPress={toggleTheme} 
                    activeOpacity={0.3}
                    style={styles.themeButton}
                >
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

