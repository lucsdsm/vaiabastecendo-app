import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Keyboard, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAppTheme } from '../../theme/ThemeProvider';
import { styles } from './styles';
import { getReadableColor } from '../../utils/color';
import { useKeyboardPadding } from '../../utils/keyboardPadding';

interface UpdatePriceCardProps {
    fuelTypes: any[];
    selectedFuel: number | string | null;
    price: string;
    setSelectedFuel: (id: any) => void;
    handlePriceChange: (text: string) => void;
}

export default function UpdatePriceCard({
    fuelTypes,
    selectedFuel,
    price,
    setSelectedFuel,
    handlePriceChange,
}: UpdatePriceCardProps) {
    const { colors, isDark } = useAppTheme();
    const { keyboardPadding } = useKeyboardPadding();

    const content = (
        <View style={[styles.cardContent, { backgroundColor: colors.background }] }>
            <View style={styles.section}>
                <Text style={[styles.label, { color: colors.textSecondary }]}>Combustível</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.fuelScroll}
                    contentContainerStyle={styles.fuelScrollContent}
                >
                    {fuelTypes.map((type) => {
                        const isSelected = selectedFuel === type.id;
                        const accentColor = getReadableColor(type.cor, isDark);
                        return (
                            <TouchableOpacity
                                key={type.id}
                                style={[
                                    styles.fuelChip,
                                    {
                                        borderColor: isSelected ? accentColor : colors.border,
                                        backgroundColor: isSelected
                                            ? accentColor + (isDark ? '22' : '14')
                                            : colors.background,
                                    },
                                ]}
                                onPress={() => setSelectedFuel(type.id)}
                                activeOpacity={0.7}
                            >
                                <View
                                    style={[
                                        styles.fuelChipDot,
                                        { backgroundColor: isSelected ? accentColor : colors.textSecondary + '60' },
                                    ]}
                                />
                                <Text
                                    style={[
                                        styles.fuelChipText,
                                        { color: isSelected ? accentColor : colors.textSecondary },
                                    ]}
                                >
                                    {type.nome}
                                </Text>
                                {isSelected && <Feather name="check" size={13} color={accentColor} />}
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>

            <View style={styles.section}>
                <Text style={[styles.label, { color: colors.textSecondary }]}>Preço por litro</Text>
                <View
                    style={[
                        styles.inputContainer,
                        {
                            backgroundColor: colors.info,
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
            style={[styles.container, { paddingBottom: keyboardPadding }]}
        >
            <TouchableOpacity activeOpacity={1} onPress={Keyboard.dismiss} style={styles.cardShell}>
                {content}
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}