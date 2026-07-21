import { useAppTheme } from '../../theme/ThemeProvider';
import { getReadableColor } from '../../utils/color';
import { styles } from './styles';

export type FuelType = {
    id: number;
    name: string;
    color: string;
};

export type FuelTypeSelectorVariant = 'surface' | 'transparent';
export type FuelTypeSelectorSize = 'compact' | 'regular';

interface UseFuelTypeSelectorParams {
    selectedFuel: number | null;
    onSelectFuel: (id: number) => void;
    variant?: FuelTypeSelectorVariant;
    size?: FuelTypeSelectorSize;
}

/**
 * Calcula estilos e cores do seletor de combustível com base no tema atual.
 */
export function useFuelTypeSelector({
    selectedFuel,
    onSelectFuel,
    variant = 'surface',
    size = 'regular',
}: UseFuelTypeSelectorParams) {
    const { colors, isDark } = useAppTheme();

    const handleSelectFuel = (id: number) => {
        onSelectFuel(id);
    };

    const getChipStyles = (type: FuelType) => {
        const isSelected = selectedFuel === type.id;
        const accentColor = getReadableColor(type.color, isDark);

        return {
            isSelected,
            accentColor,
            chipStyle: [
                styles.chipBase,
                size === 'compact' ? styles.chipCompact : styles.chipRegular,
                {
                    borderColor: isSelected ? accentColor : colors.border,
                    backgroundColor: isSelected
                        ? accentColor + (isDark ? '22' : '14')
                        : variant === 'surface'
                            ? colors.background
                            : 'transparent',
                },
            ],
            dotStyle: [
                styles.chipDot,
                {
                    backgroundColor: isSelected ? accentColor : colors.textSecondary + '60',
                },
            ],
            textStyle: [
                styles.chipTextBase,
                size === 'compact' ? styles.chipTextCompact : styles.chipTextRegular,
                {
                    color: isSelected ? accentColor : colors.textSecondary,
                },
            ],
        };
    };

    return {
        colors,
        getChipStyles,
        handleSelectFuel,
    };
}