import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAppTheme } from '../../theme/ThemeProvider';
import { styles } from './styles';
import { PrecoAtualResumo, useUpdatePriceModal } from './useUpdatePriceModal';
import { getReadableColor } from '../../utils/color';

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
    const [keyboardPadding, setKeyboardPadding] = useState(0);

    const {
        fuelTypes,
        selectedFuel,
        price,
        loading,
        setSelectedFuel,
        handlePriceChange,
        handleUpdate,
    } = useUpdatePriceModal({ visible, postoId, precosAtuais, onClose, onSuccess });

    useEffect(() => {
        const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
        const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

        const showSubscription = Keyboard.addListener(showEvent, (e) => {
            setKeyboardPadding(e.endCoordinates.height);
        });

        const hideSubscription = Keyboard.addListener(hideEvent, () => {
            setKeyboardPadding(0);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    useEffect(() => {
        if (!visible) setKeyboardPadding(0);
    }, [visible]);

    return (
        <Modal visible={visible} animationType="slide" transparent statusBarTranslucent>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={[styles.overlay, { paddingBottom: keyboardPadding }]}>
                    <TouchableWithoutFeedback>
                        <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>

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

                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}
