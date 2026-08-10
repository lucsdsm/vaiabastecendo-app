import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';

import FuelTypeSelector from '../FuelTypeSelector';

import { FuelType } from '@contexts/FuelTypesContext';

import { useAppTheme } from '@theme/ThemeProvider';
import { styles } from './styles';

interface UpdatePriceCardProps {
    fuelTypes: FuelType[];
    selectedFuel: number | null;
    price: string;
    setSelectedFuel: (id: number) => void;
    handlePriceChange: (text: string) => void;
}

export default function UpdatePriceCard({
    fuelTypes,
    selectedFuel,
    price,
    setSelectedFuel,
    handlePriceChange,
}: UpdatePriceCardProps) {
    const { colors } = useAppTheme();

    const content = (
        <View style={[{ backgroundColor: colors.background }]}>
            <View style={styles.container}>
                <FuelTypeSelector
                    label="Combustível"
                    fuelTypes={fuelTypes}
                    selectedFuel={selectedFuel}
                    onSelectFuel={setSelectedFuel}
                    showCheckIcon={true}/>
            </View>

            <View style={styles.container}>
                <Text style={[styles.label, { color: colors.textSecondary }]}>Preço por litro</Text>
                <View
                    style={[
                        styles.wrapper,
                        {
                            backgroundColor: colors.background,
                            borderColor: colors.primary + '40',
                        },
                    ]}>
                    <Text style={[styles.prefix, { color: colors.textSecondary }]}>R$</Text>
                    <TextInput
                        style={[styles.input, { color: colors.textPrimary }]}
                        placeholder="0,00"
                        placeholderTextColor={colors.textSecondary + '60'}
                        keyboardType="numeric"
                        value={price}
                        onChangeText={handlePriceChange}
                    />
                    <Text style={[styles.suffix, { color: colors.textSecondary }]}>/L</Text>
                </View>
            </View>
        </View>
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={[styles.container]}
        >
            <TouchableOpacity activeOpacity={1} onPress={Keyboard.dismiss} style={styles.shell}>
                {content}
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}