import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { styles } from './styles';
import { useAppTheme } from '../../theme/ThemeProvider';

interface LoadingStateProps {
    message?: string;
    iconName?: string;
}

export default function LoadingState({
    message = 'Carregando...',
    iconName = 'gas-pump',
}: LoadingStateProps) {
    const { colors, isDark } = useAppTheme();

    // Animacao de respiracao suave — apenas opacidade, sem escala agressiva
    const breathAnim = useRef(new Animated.Value(0.35)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(breathAnim, {
                    toValue: 1,
                    duration: 1100,
                    useNativeDriver: true,
                }),
                Animated.timing(breathAnim, {
                    toValue: 0.35,
                    duration: 1100,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [breathAnim]);

    const ringColor = colors.primary + (isDark ? '22' : '14');
    const ringBorderColor = colors.primary + '30';
    const coreColor = colors.primary + (isDark ? '33' : '1F');

    return (
        <View style={styles.container}>
            {/* Anel estatico + nucleo animado */}
            <View
                style={[
                    styles.iconRing,
                    {
                        backgroundColor: ringColor,
                        borderColor: ringBorderColor,
                    },
                ]}
            >
                <Animated.View
                    style={[
                        styles.iconCore,
                        {
                            backgroundColor: coreColor,
                            opacity: breathAnim,
                        },
                    ]}
                />
                {/* Icone fixo sobre o nucleo animado */}
                <View
                    style={[
                        styles.iconCore,
                        {
                            position: 'absolute',
                            backgroundColor: 'transparent',
                        },
                    ]}
                >
                    <FontAwesome5
                        name={iconName}
                        size={22}
                        color={colors.primary}
                    />
                </View>
            </View>

            <Text style={[styles.message, { color: colors.textSecondary }]}>
                {message}
            </Text>
        </View>
    );
}
