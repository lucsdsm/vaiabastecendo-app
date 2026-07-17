import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import { FuelType, FuelTypeSelectorSize, FuelTypeSelectorVariant, useFuelTypeSelector } from './useFuelTypeSelector';

interface FuelTypeSelectorProps {
    label: string;
    fuelTypes: FuelType[];
    selectedFuel: number | string | null;
    onSelectFuel: (id: number | string) => void;
    variant?: FuelTypeSelectorVariant;
    size?: FuelTypeSelectorSize;
    showCheckIcon?: boolean;
}

/**
 * Exibe os combustíveis como chips selecionáveis reaproveitáveis entre telas.
 */
export default function FuelTypeSelector({
    label,
    fuelTypes,
    selectedFuel,
    onSelectFuel,
    variant = 'surface',
    size = 'regular',
    showCheckIcon = false,
}: FuelTypeSelectorProps) {
    const { colors, getChipStyles, handleSelectFuel } = useFuelTypeSelector({
        selectedFuel,
        onSelectFuel,
        variant,
        size,
    });

    return (
        <View>
            <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
            >
                {fuelTypes.map((type) => {
                    const { isSelected, accentColor, chipStyle, dotStyle, textStyle } = getChipStyles(type);

                    return (
                        <TouchableOpacity
                            key={type.id}
                            style={chipStyle}
                            onPress={() => handleSelectFuel(type.id)}
                            activeOpacity={0.7}
                        >
                            <View style={dotStyle} />
                            <Text style={textStyle}>{type.nome}</Text>
                            {showCheckIcon && isSelected && (
                                <Feather name="check" size={13} color={accentColor} style={styles.checkIcon} />
                            )}
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
}