import { useCallback, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useToast } from '@contexts/ToastContext';
import { useAppTheme } from '@theme/ThemeProvider';

export function useActionToast() {
  const { toastState, hideToast } = useToast();
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();

  const translateY = useRef(new Animated.Value(-180)).current;
  const progress = useRef(new Animated.Value(0)).current;

  const topOffset = Math.max(insets.top, 8) + 8;

  const handleConfirm = useCallback(() => {
    const action = toastState.onConfirm;

    hideToast();
    action?.();
  }, [hideToast, toastState.onConfirm]);

  useEffect(() => {
    progress.stopAnimation();
    translateY.stopAnimation();

    if (!toastState.visible) {
      Animated.timing(translateY, {
        toValue: -180,
        duration: 220,
        useNativeDriver: true,
      }).start();

      return;
    }

    progress.setValue(0);

    Animated.spring(translateY, {
      toValue: topOffset,
      speed: 14,
      bounciness: 5,
      useNativeDriver: true,
    }).start();

    const progressAnimation = Animated.timing(progress, {
      toValue: 1,
      duration: toastState.duration,
      useNativeDriver: false,
    });

    progressAnimation.start(({ finished }) => {
      if (finished) {
        hideToast();
      }
    });

    return () => {
      progressAnimation.stop();
    };
  }, [
    hideToast,
    progress,
    toastState.duration,
    toastState.message,
    toastState.visible,
    topOffset,
    translateY,
  ]);

  const appearance = (() => {
    switch (toastState.type) {
      case 'success':
        return {
          accentColor: colors.background,
          icon: 'circle-check',
          fallbackTitle: 'Sucesso',
          backgroundColor: colors.primary,
          color: colors.background,
        };

      case 'danger':
      case 'confirm':
        return {
          accentColor: colors.danger,
          icon: 'triangle-exclamation',
          fallbackTitle: 'Confirmação necessária',
          backgroundColor: colors.surface,
          color: colors.textPrimary,
        };
      case 'info':
        return {
          accentColor: colors.info,
          icon: 'circle-info',
          fallbackTitle: 'Aviso',
          backgroundColor: colors.surface,
          color: colors.textPrimary,
        };

      default:
        return {
          accentColor: colors.info,
          icon: 'circle-info',
          fallbackTitle: 'Aviso',
          backgroundColor: colors.surface,
          color: colors.textPrimary,
        };
    }
  })();

  return {
    toastState,
    translateY,
    progress,
    topOffset,
    handleConfirm,
    ...appearance,
  };
}