import React from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAppTheme } from '../../theme/ThemeProvider';
import { styles } from './styles';
import { useUpdatePriceModal } from './useUpdatePriceModal';

interface UpdatePriceModalProps {
    visible: boolean;
    onClose: () => void;
    postoId: string;
    postoNome: string;
    onSuccess: () => void;
}

/**
 * Modal para envio de atualizacao de preco por tipo de combustivel.
 */
export default function UpdatePriceModal({ visible, onClose, postoId, postoNome, onSuccess }: UpdatePriceModalProps) {
    const { colors } = useAppTheme();
    const {
        fuelTypes,
        selectedFuel,
        price,
        loading,
        setSelectedFuel,
        handlePriceChange,
        handleUpdate,
    } = useUpdatePriceModal({ visible, postoId, onClose, onSuccess });

    return (
        <Modal visible={visible} animationType="fade" transparent>
            <View style={styles.overlay}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={[styles.modalContent, { backgroundColor: colors.surface }]}
                >
                    <View style={styles.header}>
                        <Text style={[styles.title, { color: colors.textPrimary }]}>Atualizar Preço</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Feather name="x" size={24} color={colors.textSecondary} />
                        </TouchableOpacity>
                    </View>

                    <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{postoNome}</Text>

                    <View style={styles.section}>
                        <Text style={[styles.label, { color: colors.textPrimary }]}>Selecione o Combustível:</Text>
                        <View style={styles.fuelGrid}>
                            {fuelTypes.map((type) => (
                                <TouchableOpacity
                                    key={type.id}
                                    style={[
                                        styles.fuelOption,
                                        { borderColor: selectedFuel === type.id ? type.cor : 'transparent', backgroundColor: type.cor + '15' }
                                    ]}
                                    onPress={() => setSelectedFuel(type.id)}
                                >
                                    <Text style={[styles.fuelOptionText, { color: selectedFuel === type.id ? type.cor : colors.textSecondary }]}>
                                        {type.nome}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={[styles.label, { color: colors.textPrimary }]}>Preço por Litro (R$):</Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: colors.background, color: colors.textPrimary, borderColor: colors.primary + '33' }]}
                            placeholder="0,00"
                            placeholderTextColor={colors.textSecondary}
                            keyboardType="numeric"
                            value={price}
                            onChangeText={handlePriceChange}
                        />
                    </View>

                    <TouchableOpacity
                        style={[styles.submitButton, { backgroundColor: colors.primary }]}
                        onPress={() => handleUpdate(selectedFuel, price)}
                        disabled={loading}
                    >
                        {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.submitButtonText}>Confirmar Atualização</Text>}
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
}
