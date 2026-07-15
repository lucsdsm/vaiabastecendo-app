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
    iconName = 'gas-pump' 
}: LoadingStateProps) {
    const { colors, isDark } = useAppTheme();
    
    const pulseAnim = useRef(new Animated.Value(0.4)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 0.4,
                    duration: 800,
                    useNativeDriver: true,
                })
            ])
        ).start();
    }, [pulseAnim]);

    return (
        <View style={styles.container}>
            <Animated.View style={[
                styles.iconContainer,
                {
                    backgroundColor: colors.primary + (isDark ? '33' : '1A'),
                    transform: [{ scale: pulseAnim }],
                    opacity: pulseAnim,
                }
            ]}>
                <FontAwesome5 name={iconName} size={28} color={colors.primary} />
            </Animated.View>
            
            <Text style={[styles.message, { color: colors.textSecondary }]}>
                {message}
            </Text>
        </View>
    );
}