import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

import { useAppTheme } from '../../theme/ThemeProvider';

/**
 * Controla as animacoes de progresso e fade-out da tela de carregamento.
 */
export function useLoadingScreen(onFinish: () => void, canFinish: boolean) {
    const { colors } = useAppTheme();

    const progressAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (!canFinish) {
            return;
        }
        
        Animated.timing(progressAnim, {
            toValue: 100, 
            duration: 2000,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true, 
        }).start(() => {
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start(onFinish);
        });
    }, [canFinish, onFinish, opacityAnim, progressAnim]);

    const rotateInterpolated = progressAnim.interpolate({
        inputRange: [-5, 105],
        outputRange: ['-90deg', '90deg'] 
    });

    return {
        colors,
        opacityAnim,
        rotateInterpolated,
    };
}
