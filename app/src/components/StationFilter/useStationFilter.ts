import { useMemo } from 'react';
import { useAppTheme } from '../../theme/ThemeProvider';
import { styles } from './styles';

export type StationFilterSelectorVariant = 'surface' | 'primary' | 'ghost';
export type StationFilterSelectorSize = 'compact' | 'regular';

export interface StationFilterOption {
  label: string;
  value: string | number;
  icon?: string;
}

interface UseStationFilterSelectorProps {
  selectedFilter: string | number | null;
  onSelectFilter: (value: string | number | null) => void;
  variant?: StationFilterSelectorVariant;
  size?: StationFilterSelectorSize;
}

export function useStationFilterSelector({
  selectedFilter,
  onSelectFilter,
  variant = 'surface',
  size = 'regular',
}: UseStationFilterSelectorProps) {
  const { colors } = useAppTheme();

  const handleSelectFilter = (value: string | number | null) => {
    onSelectFilter(value);
  };

  const getChipStyles = (option: StationFilterOption) => {
    const isSelected = selectedFilter === option.value;

    const accentColor = isSelected ? colors.primary : colors.textSecondary;

    const variantStyles = useMemo(() => {
      if (variant === 'primary') {
        return {
          backgroundColor: isSelected ? colors.primary : colors.surface,
          borderColor: isSelected ? colors.primary : colors.border,
        };
      }

      if (variant === 'ghost') {
        return {
          backgroundColor: 'transparent',
          borderColor: isSelected ? colors.primary : colors.border,
        };
      }

      return {
        backgroundColor: isSelected ? colors.primary + '16' : colors.surface,
        borderColor: isSelected ? colors.primary : colors.border,
      };
    }, [variant, isSelected, colors]);

    const chipStyle = [
      styles.base,
      styles.chip,
      variantStyles,
    ];

    const textStyle = [
      styles.text, { color: isSelected ? colors.textPrimary : colors.textSecondary },
    ];

    return {
      isSelected,
      accentColor,
      chipStyle,
      textStyle,
    };
  };

  return {
    colors,
    getChipStyles,
    handleSelectFilter,
  };
}