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
        // A largura da barra usa thread JS porque width nao suporta native driver.
        Animated.timing(progressAnim, {
            toValue: 100,
            duration: 2000,
            easing: Easing.out(Easing.ease),
            useNativeDriver: false,
        }).start(() => {
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start(onFinish);
        });
    }, [canFinish, onFinish, opacityAnim, progressAnim]);

    const widthInterpolated = progressAnim.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
    });

    return {
        colors,
        opacityAnim,
        widthInterpolated,
    };
}
