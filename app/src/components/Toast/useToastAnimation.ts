import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useToast } from '@contexts/ToastContext';

import { useAppTheme } from '@theme/ThemeProvider';

/**
 * Controla animação e aparência visual do toast.
 * O conteúdo exibido vem do ToastContext.
 */
export function useToastAnimation() {
  const { toastState, hideToast } = useToast();
  const { colors } = useAppTheme();

  const translateY = useRef(new Animated.Value(-100)).current;
  const insets = useSafeAreaInsets();
  const topOffset = Math.max(insets.top, 8) + 8;

  useEffect(() => {
    if (toastState.visible) {
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
  }, [
    toastState.visible,
    toastState.message,
    toastState.type,
    hideToast,
    translateY,
    topOffset,
  ]);

  function getToastStyle() {
    switch (toastState.type) {
      case 'success':
        return { backgroundColor: colors.primary, icon: 'circle-check' };
      case 'danger':
        return { backgroundColor: colors.danger, icon: 'exclamation-triangle' };
      default:
        return { backgroundColor: colors.info, icon: 'circle-info' };
    }
  }

  function getToastTitle() {
    switch (toastState.type) {
      case 'success':
        return 'Sucesso';
      case 'danger':
        return 'Erro';
      default:
        return 'Aviso';
    }
  }

  const { backgroundColor, icon } = getToastStyle();
  const title = getToastTitle();

  return {
    toastState,
    translateY,
    backgroundColor,
    icon,
    title,
  };
}