import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, Keyboard, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAppTheme } from '../../theme/ThemeProvider';
import { styles } from './styles';
import { PrecoAtualResumo, useUpdatePriceCard } from './useUpdatePriceModal';
import { getReadableColor } from '../../utils/color';
import { useKeyboardPadding } from '../../utils/keyboardPadding';

interface UpdatePriceCardProps {
    postoId: string;
    postoNome: string;
    precosAtuais: PrecoAtualResumo[];
    onSuccess: () => void;
}

export default function UpdatePriceCard({
    postoId,
    postoNome,
    precosAtuais,
    onSuccess,
}: UpdatePriceCardProps) {
    const { colors, isDark } = useAppTheme();
    const { keyboardPadding, setKeyboardPadding } = useKeyboardPadding();

    const {
        fuelTypes,
        selectedFuel,
        price,
        loading,
        setSelectedFuel,
        handlePriceChange,
        handleUpdate,
    } = useUpdatePriceCard({ postoId, precosAtuais, onSuccess });

    const content = (
        <View style={[styles.cardContent, { backgroundColor: colors.surface }] }>
            <View style={[styles.handle, { backgroundColor: colors.textSecondary + '30' }]} />

            <Text style={[styles.title, { color: colors.textPrimary }]}>Atualizar Preco</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{postoNome}</Text>

            <View style={styles.section}>
                <Text style={[styles.label, { color: colors.textSecondary }]}>Combustivel</Text>
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
                <Text style={[styles.label, { color: colors.textSecondary }]}>Preco por litro</Text>
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

            <TouchableOpacity
                style={[
                    styles.submitButton,
                    {
                        backgroundColor: colors.primary,
                        opacity: loading ? 0.7 : 1,
                    },
                ]}
                onPress={() => handleUpdate(selectedFuel, price)}
                disabled={loading}
                activeOpacity={0.8}
            >
                {loading ? (
                    <ActivityIndicator color="#FFF" size="small" />
                ) : (
                    <>
                        <Feather name="check" size={18} color="#FFF" />
                        <Text style={styles.submitButtonText}>Confirmar</Text>
                    </>
                )}
            </TouchableOpacity>
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
