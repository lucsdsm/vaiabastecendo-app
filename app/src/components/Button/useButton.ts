import { useMemo } from 'react';
import { useAppTheme } from '../../theme/ThemeProvider';
import { styles } from './styles';

interface UseButtonParams {
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  fullWidth?: boolean;
}

export function useButton({
  disabled = false,
  loading = false,
  variant = 'primary',
  fullWidth = true,
}: UseButtonParams) {
  const { colors, isDark } = useAppTheme();

  const isDisabled = disabled || loading;

  const containerStyle = useMemo(() => {
    const baseStyle: any[] = [styles.button];

    if (fullWidth) {
      baseStyle.push(styles.fullWidth);
    }

    if (variant === 'primary') {
      baseStyle.push({
        backgroundColor: isDisabled
          ? isDark
            ? 'rgba(255,255,255,0.10)'
            : 'rgba(0,0,0,0.08)'
          : colors.primary,
        borderColor: isDisabled
          ? 'transparent'
          : colors.primary,
      });
    }

    if (variant === 'secondary') {
      baseStyle.push({
        backgroundColor: isDark
          ? colors.primary + '1A'
          : colors.primary + '10',
        borderColor: isDark
          ? colors.primary + '35'
          : colors.primary + '22',
      });
    }

    if (variant === 'ghost') {
      baseStyle.push({
        backgroundColor: 'transparent',
        borderColor: isDark
          ? 'rgba(255,255,255,0.10)'
          : 'rgba(0,0,0,0.08)',
      });
    }

    return baseStyle;
  }, [colors, isDark, variant, isDisabled, fullWidth]);

  const textStyle = useMemo(() => {
    if (variant === 'primary') {
      return [
        styles.buttonText,
        {
          color: isDisabled
            ? isDark
              ? 'rgba(255,255,255,0.55)'
              : 'rgba(255,255,255,0.75)'
            : '#FFFFFF',
        },
      ];
    }

    if (variant === 'secondary') {
      return [
        styles.buttonText,
        {
          color: isDisabled
            ? colors.textSecondary
            : colors.primary,
        },
      ];
    }

    return [
      styles.buttonText,
      {
        color: isDisabled
          ? colors.textSecondary
          : colors.textPrimary,
      },
    ];
  }, [colors, isDark, variant, isDisabled]);

  const activityColor =
    variant === 'primary' ? '#FFFFFF' : colors.primary;

  return {
    colors,
    isDark,
    isDisabled,
    containerStyle,
    textStyle,
    activityColor,
  };
}