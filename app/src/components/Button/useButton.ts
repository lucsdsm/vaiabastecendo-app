import { useMemo } from 'react';
import { styles } from './styles';

interface UseButtonParams {
  colors: {
    primary: string;
    textPrimary: string;
    textSecondary: string;
    background: string;
  };
  disabled: boolean;
  loading: boolean;
  variant: 'primary' | 'secondary' | 'ghost';
  fullWidth: boolean;
}

export function useButton({
  colors,
  disabled,
  loading,
  variant,
  fullWidth,
}: UseButtonParams) {
  const isDisabled = disabled || loading;

  const containerStyle = useMemo(() => {
    const baseStyle = [
      styles.button,
      fullWidth && styles.fullWidth,
    ];

    if (variant === 'primary') {
      baseStyle.push({
        backgroundColor: isDisabled ? colors.textSecondary + '40' : colors.primary,
        borderColor: isDisabled ? 'transparent' : colors.primary,
      });
    }

    if (variant === 'secondary') {
      baseStyle.push({
        backgroundColor: colors.primary + '10',
        borderColor: colors.primary + '22',
      });
    }

    if (variant === 'ghost') {
      baseStyle.push({
        backgroundColor: 'transparent',
        borderColor: colors.textSecondary + '25',
      });
    }

    return baseStyle;
  }, [colors, variant, isDisabled, fullWidth]);

  const textStyle = useMemo(() => {
    if (variant === 'primary') {
      return [
        styles.buttonText,
        { color: '#FFFFFF' },
      ];
    }

    if (variant === 'secondary') {
      return [
        styles.buttonText,
        { color: colors.primary },
      ];
    }

    return [
      styles.buttonText,
      { color: colors.textPrimary },
    ];
  }, [colors, variant]);

  const activityColor =
    variant === 'primary' ? '#FFFFFF' : colors.primary;

  return {
    isDisabled,
    containerStyle,
    textStyle,
    activityColor,
  };
}