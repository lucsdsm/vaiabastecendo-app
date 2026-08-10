import { useAppTheme } from '@theme/ThemeProvider';

import { getReadableColor } from '@utils/color';

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
}

/**
 * Calcula estilos e cores do seletor de combustível com base no tema atual.
 */
export function useFuelTypeSelector({
    selectedFuel,
    onSelectFuel,
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
                styles.chip,
                {
                    borderColor: isSelected ? accentColor : colors.border,
                    backgroundColor: isSelected
                        ? accentColor + (isDark ? '22' : '14')
                        : colors.background,
                },
            ],
            textStyle: [
                styles.text,
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