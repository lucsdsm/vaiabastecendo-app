import React, { useEffect, useRef } from 'react';
import { Text, TouchableOpacity, View, Animated, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';
import { useAppTheme } from '../../theme/ThemeProvider';

export interface InfoBannerProps {
    text: string;
    gradientColors?: string[];
    textColor?: string;
    logoElement?: React.ReactNode;
    onPress?: () => void;
}

export default function InfoBanner({ 
    text, 
    gradientColors, 
    textColor,
    logoElement,
    onPress
}: InfoBannerProps) {
    const { colors } = useAppTheme();
    
    const defaultGradient = ['#FFF3B0', '#FFD54F', '#FFF3B0'];
    const activeColors = gradientColors || defaultGradient;
    const txtColor = textColor || '#F5F5F5';

    const animValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animValue, {
                    toValue: 1,
                    duration: 1000, 
                    useNativeDriver: true,
                }),
                Animated.timing(animValue, {
                    toValue: 0,
                    duration: 1000, 
                    useNativeDriver: true,
                })
            ])
        ).start();
    }, [animValue]);

    const translateX = animValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -100] 
    });

    return (
        <TouchableOpacity 
            style={styles.container}
            onPress={onPress}
            activeOpacity={0.8}
            disabled={!onPress} 
        >
            {/* Camada do Fundo: Gradiente Animado */}
            <Animated.View 
                style={[
                    StyleSheet.absoluteFill, 
                    styles.gradientWrapper,
                    { transform: [{ translateX }] }
                ]}
            >
                <LinearGradient 
                    colors={activeColors} 
                    start={{ x: 0, y: 0.5 }} 
                    end={{ x: 0.5, y: 1.5 }} 
                    style={StyleSheet.absoluteFill} 
                />
            </Animated.View>
            
            {/* Camada Superior: Conteúdo isolado do fundo */}
            <View style={styles.contentWrapper}>
                <View style={styles.leftContent}>
                    <Text style={[styles.text, { color: txtColor }]}>
                        {text}
                    </Text>
                </View>

                <View style={styles.rightContent}>
                    {logoElement}
                </View>
            </View>
        </TouchableOpacity>
    );
}