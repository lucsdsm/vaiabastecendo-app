import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

import { useToast as useToastContext } from '../../contexts/ToastContext';
import { useAppTheme } from '../../theme/ThemeProvider';

/**
 * Animacao e aparencia do toast (dados vêm do ToastContext).
 */
export function useToast() {
    const { toastData, hideToast } = useToastContext();
    const { colors } = useAppTheme();
    const translateY = useRef(new Animated.Value(-100)).current;

    useEffect(() => {
        if (toastData.visible) {
            Animated.spring(translateY, {
                toValue: 50,
                useNativeDriver: true,
                speed: 12,
            }).start();

            const timer = setTimeout(() => {
                hideToast();
            }, 3000);

            return () => clearTimeout(timer);
        } else {
            Animated.timing(translateY, {
                toValue: -100,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [toastData.visible, hideToast, translateY]);

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

    const { bg, icon } = getToastStyle();

    return {
        toastData,
        translateY,
        bg,
        icon,
    };
}
