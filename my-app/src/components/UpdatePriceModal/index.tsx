import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    Animated,
    Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAppTheme } from '../../theme/ThemeProvider';
import { styles } from './styles';
import { PrecoAtualResumo, useUpdatePriceModal } from './useUpdatePriceModal';
import { getReadableColor } from '../../utils/color';
import { useKeyboardPadding } from '../../utils/keyboardPadding';

const { height: screenHeight } = Dimensions.get('window');

interface UpdatePriceModalProps {
    visible: boolean;
    onClose: () => void;
    postoId: string;
    postoNome: string;
    precosAtuais: PrecoAtualResumo[];
    onSuccess: () => void;
}

export default function UpdatePriceModal({
    visible,
    onClose,
    postoId,
    postoNome,
    precosAtuais,
    onSuccess,
}: UpdatePriceModalProps) {
    const { colors, isDark } = useAppTheme();
    const { keyboardPadding, setKeyboardPadding } = useKeyboardPadding();

    const translateY = useRef(new Animated.Value(screenHeight)).current;

    const {
        fuelTypes,
        selectedFuel,
        price,
        loading,
        setSelectedFuel,
        handlePriceChange,
        handleUpdate,
    } = useUpdatePriceModal({ visible, postoId, precosAtuais, onClose, onSuccess });

    // Animação de slide para o modal
    useEffect(() => {
        if (visible) {
            Animated.timing(translateY, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            }).start();
        } else {
            translateY.setValue(screenHeight);
        }
    }, [visible]);

    // Garante que o padding seja resetado ao fechar o modal
    useEffect(() => {
        if (!visible) setKeyboardPadding(0);
    }, [visible]);

    return (
        <Modal visible={visible} animationType="fade" transparent statusBarTranslucent onRequestClose={onClose}>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={[styles.overlay, { paddingBottom: keyboardPadding }]}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <Animated.View
                            style={[
                                styles.modalContent,
                                {
                                    backgroundColor: colors.surface,
                                    transform: [{ translateY }]
                                }
                            ]}
                        >

                            {/* Handle indicator */}
                            <View style={[styles.handle, { backgroundColor: colors.textSecondary + '30' }]} />

                            {/* Header */}
                            <View style={styles.header}>
                                <Text style={[styles.title, { color: colors.textPrimary }]}>
                                    Atualizar Preco
                                </Text>
                                <TouchableOpacity
                                    onPress={onClose}
                                    style={[styles.closeButton, { backgroundColor: colors.background }]}
                                    activeOpacity={0.7}
                                >
                                    <Feather name="x" size={20} color={colors.textSecondary} />
                                </TouchableOpacity>
                            </View>

                            {/* Nome do posto */}
                            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                                {postoNome}
                            </Text>

                            {/* Selecao de combustivel — scroll horizontal de chips */}
                            <View style={styles.section}>
                                <Text style={[styles.label, { color: colors.textSecondary }]}>
                                    Combustivel
                                </Text>
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
                                                {isSelected && (
                                                    <Feather name="check" size={13} color={accentColor} />
                                                )}
                                            </TouchableOpacity>
                                        );
                                    })}
                                </ScrollView>
                            </View>

                            {/* Input de preco */}
                            <View style={styles.section}>
                                <Text style={[styles.label, { color: colors.textSecondary }]}>
                                    Preco por litro
                                </Text>
                                <View
                                    style={[
                                        styles.inputContainer,
                                        {
                                            backgroundColor: colors.background,
                                            borderColor: colors.primary + '40',
                                        },
                                    ]}
                                >
                                    <Text style={[styles.currencyPrefix, { color: colors.textSecondary }]}>
                                        R$
                                    </Text>
                                    <TextInput
                                        style={[styles.input, { color: colors.textPrimary }]}
                                        placeholder="0,00"
                                        placeholderTextColor={colors.textSecondary + '60'}
                                        keyboardType="numeric"
                                        value={price}
                                        onChangeText={handlePriceChange}
                                    />
                                    <Text style={[styles.currencySuffix, { color: colors.textSecondary }]}>
                                        /L
                                    </Text>
                                </View>
                            </View>

                            {/* Botao de confirmacao */}
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

                        </Animated.View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}
