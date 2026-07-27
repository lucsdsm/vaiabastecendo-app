import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { useAppTheme } from '../../theme/ThemeProvider';
import { styles } from './styles';
import FuelTypeSelector from '../FuelTypeSelector';
import { FuelType } from '../../contexts/FuelTypesContext';

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
        <View style={[styles.cardContent, { backgroundColor: colors.background }]}>
            <View style={styles.section}>
                <FuelTypeSelector
                    label="Combustível"
                    fuelTypes={fuelTypes}
                    selectedFuel={selectedFuel}
                    onSelectFuel={setSelectedFuel}
                    variant="surface"
                    size="compact"
                    showCheckIcon={true}
                />
            </View>

            <View style={styles.section}>
                <Text style={[styles.label, { color: colors.textSecondary }]}>Preço por litro</Text>
                <View
                    style={[
                        styles.inputContainer,
                        {
                            backgroundColor: colors.background,
                            borderColor: colors.primary + '40',
                        },
                    ]}
                >
                    <Text style={[styles.currencyPrefix, { color: colors.textSecondary }]}>R$</Text>
                    <TextInput
                        style={[styles.input, { color: colors.textPrimary }]}
                        placeholder="0,00"
                        placeholderTextColor={colors.textSecondary + '60'}
                        keyboardType="numeric"
                        value={price}
                        onChangeText={handlePriceChange}
                    />
                    <Text style={[styles.currencySuffix, { color: colors.textSecondary }]}>/L</Text>
                </View>
            </View>
        </View>
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={[styles.container]}
        >
            <TouchableOpacity activeOpacity={1} onPress={Keyboard.dismiss} style={styles.cardShell}>
                {content}
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}