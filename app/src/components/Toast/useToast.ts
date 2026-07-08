import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useToast as useToastContext } from '../../contexts/ToastContext';
import { useAppTheme } from '../../theme/ThemeProvider';

/**
 * Animacao e aparencia do toast (dados vêm do ToastContext).
 */
export function useToast() {
    const { toastData, hideToast } = useToastContext();
    const { colors } = useAppTheme();
    const translateY = useRef(new Animated.Value(-100)).current;
    const insets = useSafeAreaInsets();
    const topOffset = Math.max(insets.top, 8) + 8;

    useEffect(() => {
        if (toastData.visible) {
            Animated.spring(translateY, {
                toValue: topOffset,
                useNativeDriver: true,
                speed: 12,
            }).start();

            const timer = setTimeout(() => {
                hideToast();
            }, 3000);

            return () => clearTimeout(timer);
        }

        Animated.timing(translateY, {
            toValue: -100,
            duration: 250,
            useNativeDriver: true,
        }).start();
    }, [toastData.visible, toastData.message, toastData.type, hideToast, translateY, topOffset]);

    const getToastStyle = () => {
        switch (toastData.type) {
            case 'success':
                return { bg: colors.success, icon: 'check-circle' };
            case 'danger':
                return { bg: colors.danger, icon: 'alert-circle' };
            default:
                return { bg: colors.info, icon: 'info' };
        }
    };

    const getToastTitle = () => {
        switch (toastData.type) {
            case 'success':
                return 'Sucesso';
            case 'danger':
                return 'Erro';
            default:
                return 'Aviso';
        }
    };

    const { bg, icon } = getToastStyle();
    const title = getToastTitle();

    return {
        toastData,
        translateY,
        bg,
        icon,
        title,
    };
}
