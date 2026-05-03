import React, { useState, useEffect } from 'react';
import { 
    View, Text, Modal, TouchableOpacity, TextInput, ActivityIndicator, 
    Platform, TouchableWithoutFeedback, Keyboard 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAppTheme } from '../../theme/ThemeProvider';
import { styles } from './styles';
import { PrecoAtualResumo, useUpdatePriceModal } from './useUpdatePriceModal';

interface UpdatePriceModalProps {
    visible: boolean;
    onClose: () => void;
    postoId: string;
    postoNome: string;
    precosAtuais: PrecoAtualResumo[];
    onSuccess: () => void;
}

export default function UpdatePriceModal({ visible, onClose, postoId, postoNome, precosAtuais, onSuccess }: UpdatePriceModalProps) {
    const { colors } = useAppTheme();
    const [keyboardPadding, setKeyboardPadding] = useState(0);
    
    const {
        fuelTypeRows,
        selectedFuel,
        price,
        loading,
        setSelectedFuel,
        handlePriceChange,
        handleUpdate,
    } = useUpdatePriceModal({ visible, postoId, precosAtuais, onClose, onSuccess });

    // O nosso próprio motor de teclado, à prova de falhas!
    useEffect(() => {
        // iOS avisa antes do teclado aparecer (WillShow), Android avisa logo depois (DidShow)
        const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
        const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

        const showSubscription = Keyboard.addListener(showEvent, (e) => {
            // Pega a altura exata do teclado e empurra a tela para cima
            setKeyboardPadding(e.endCoordinates.height);
        });
        
        const hideSubscription = Keyboard.addListener(hideEvent, () => {
            // Teclado desceu, zeramos o buraco na mesma hora
            setKeyboardPadding(0);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    // Se o modal for fechado abruptamente, garantimos que o padding vai zerar para a próxima vez
    useEffect(() => {
        if (!visible) setKeyboardPadding(0);
    }, [visible]);

    return (
        <Modal visible={visible} animationType="fade" transparent statusBarTranslucent>
            
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                {/* Aqui está a mágica: o paddingBottom dinâmico entra no overlay */}
                <View style={[styles.overlay, { paddingBottom: keyboardPadding }]}>
                    
                    <TouchableWithoutFeedback>
                        <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
                            
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
                                    {fuelTypeRows.map((row, rowIndex) => (
                                        <View key={rowIndex} style={styles.fuelRow}>
                                            {row.map((type) => (
                                                <View key={type.id} style={styles.fuelOptionBlock}>
                                                    <TouchableOpacity
                                                        style={[
                                                            styles.fuelOption,
                                                            {
                                                                borderColor: selectedFuel === type.id ? type.cor : 'transparent',
                                                                backgroundColor: type.cor + '15',
                                                            },
                                                        ]}
                                                        onPress={() => setSelectedFuel(type.id)}
                                                    >
                                                        <Text
                                                            style={[
                                                                styles.fuelOptionText,
                                                                { color: selectedFuel === type.id ? type.cor : colors.textSecondary },
                                                            ]}
                                                        >
                                                            {type.nome}
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            ))}
                                        </View>
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

                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}