import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useHeader } from './useHeader';
import { styles } from './styles';

import { useAuth } from '../../contexts/AuthContext';
import { useAppTheme } from '../../theme/ThemeProvider';

/**
 * Header principal da aplicacao.
 * Exibe marca, titulo centralizado e controle manual de tema.
*/
export default function Header() {
    const { colors, toggleTheme, isDark } = useHeader();
    const { userData } = useAuth();
    const displayName = userData?.primeiro_nome || 'Motorista';

    return (
        <View style={[
            styles.container,
            {
                backgroundColor: colors.background,
            }
        ]}>
            <View style={styles.content}>
                <View
                    style={styles.titleContainer}
                    pointerEvents="none"
                >
                    <Text style={[styles.title, { color: colors.primary }]}>
                        Olá, {displayName}!
                    </Text>

                    <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                        Os melhores preços de combustíveis perto de você.
                    </Text>
                    
                </View>

                <View style={styles.themeButtonContainer}>
                    <Pressable
                        onPress={toggleTheme}
                        style={({ pressed }) => [
                            styles.themeButton,
                            pressed && styles.themeButtonPressed,
                        ]}
                        accessibilityRole="button"
                        accessibilityLabel="Alternar tema"
                    >
                        <Feather
                            name={isDark ? "moon" : "sun"}
                            size={22}
                            color={colors.textSecondary}
                        />
                    </Pressable>
                </View>


                {/* <Image
                    source={require('../../../assets/images/nozzleready.png')}
                    style={styles.characterImage}
                    resizeMode="contain"
                /> */}
            </View>
        </View>
    )
};

