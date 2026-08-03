import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { styles } from './styles';
import { FuelType, FuelTypeSelectorSize, FuelTypeSelectorVariant, useFuelTypeSelector } from './useFuelTypeSelector';

interface FuelTypeSelectorProps {
    label: string;
    fuelTypes: FuelType[];
    selectedFuel: number | null;
    onSelectFuel: (id: number) => void;
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
    showCheckIcon = true,
}: FuelTypeSelectorProps) {
    const { colors, getChipStyles, handleSelectFuel } = useFuelTypeSelector({
        selectedFuel,
        onSelectFuel,
        variant,
        size,
    });

    return (
        <View>
            <Text style={[styles.label, { color: colors.textSecondary }]}>
                {label}
            </Text>

            {fuelTypes.length > 0 ? (
                <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                >
                {fuelTypes.map((type) => {
                    const { isSelected, accentColor, chipStyle, textStyle } =
                    getChipStyles(type);

                    return (
                    <TouchableOpacity
                        key={type.id}
                        style={chipStyle}
                        onPress={() => handleSelectFuel(type.id)}
                        activeOpacity={0.7}
                    >
                        <Text style={textStyle}>{type.name}</Text>
                        {showCheckIcon && isSelected && (
                        <FontAwesome6
                            name="check"
                            iconStyle="solid"
                            size={13}
                            color={accentColor}
                            style={styles.checkIcon}
                        />
                        )}
                    </TouchableOpacity>
                    );
                })}
                </ScrollView>
            ) : (
                <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                Nenhum tipo de combustível cadastrado no momento. Contate o suporte para mais informações.
                </Text>
            )}
            </View>
    );
}