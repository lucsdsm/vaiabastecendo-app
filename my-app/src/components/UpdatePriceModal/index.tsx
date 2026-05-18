import React, { useState, useEffect } from 'react';
import { 
    View, Text, Modal, TouchableOpacity,
    Platform, TouchableWithoutFeedback, Keyboard 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAppTheme } from '../../theme/ThemeProvider';
import { styles } from './styles';
import { PrecoAtualResumo, useUpdatePriceModal } from './useUpdatePriceModal';
import { getReadableColor } from '../../utils/color';
import { Button, Input } from '../ui';

interface UpdatePriceModalProps {
    visible: boolean;
    onClose: () => void;
    postoId: string;
    postoNome: string;
    precosAtuais: PrecoAtualResumo[];
    onSuccess: () => void;
}

export default function UpdatePriceModal({ visible, onClose, postoId, postoNome, precosAtuais, onSuccess }: UpdatePriceModalProps) {
    const { colors, isDark } = useAppTheme();
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

    // Se o modal for fechado abruptamente, garante que o padding vai zerar para a próxima vez
    useEffect(() => {
        if (!visible) setKeyboardPadding(0);
    }, [visible]);

    return (
        <Modal visible={visible} animationType="fade" transparent statusBarTranslucent>
            
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={[styles.overlay, { paddingBottom: keyboardPadding }]}>
                    
                    <TouchableWithoutFeedback>
                        <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
                            
                            <View style={styles.header}>
                                <Text style={[styles.title, { color: colors.textPrimary }]}>Atualizar Preço</Text>
                                <TouchableOpacity onPress={onClose} accessibilityLabel="Fechar modal de atualizacao">
                                    <Feather name="x" size={24} color={colors.textSecondary} />
                                </TouchableOpacity>
                            </View>

                            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{postoNome} </Text>
                            <Text style={[styles.helperText, { color: colors.textSecondary }]}>
                                Sua atualizacao sera exibida para toda a comunidade.
                            </Text>

                            <View style={styles.section}>
                                <Text style={[styles.label, { color: colors.textPrimary }]}>Selecione o Combustível:</Text>
                                <View style={styles.fuelGrid}>
                                    {fuelTypeRows.map((row, rowIndex) => (
                                        <View key={rowIndex} style={styles.fuelRow}>
                                            {row.map((type) => (
                                                <View key={type.id} style={styles.fuelOptionBlock}>
                                                    {(() => {
                                                        const accentColor = getReadableColor(type.cor, isDark);
                                                        const isSelected = selectedFuel === type.id;
                                                        return (
                                                    <TouchableOpacity
                                                        style={[
                                                            styles.fuelOption,
                                                            {
                                                                borderColor: isSelected ? accentColor : colors.border,
                                                                backgroundColor: isSelected
                                                                    ? accentColor + '20'
                                                                    : colors.background,
                                                            },
                                                        ]}
                                                        onPress={() => setSelectedFuel(type.id)}
                                                    >
                                                        <View style={styles.fuelOptionContent}>
                                                            <Text
                                                                style={[
                                                                    styles.fuelOptionText,
                                                                    { color: isSelected ? accentColor : colors.textSecondary },
                                                                ]}
                                                            >
                                                                {type.nome}
                                                            </Text>
                                                            {isSelected ? (
                                                                <Feather name="check" size={14} color={accentColor} />
                                                            ) : null}
                                                        </View>
                                                    </TouchableOpacity>
                                                        );
                                                    })()}
                                                </View>
                                            ))}
                                        </View>
                                    ))}
                                </View>
                            </View>

                             <View style={styles.section}>
                                <Text style={[styles.label, { color: colors.textSecondary }]}>
                                    Preco por litro
                                </Text>
                                <Input
                                    prefix="R$"
                                    suffix="/L"
                                    keyboardType="numeric"
                                    value={price}
                                    onChangeText={handlePriceChange}
                                    placeholder="0,00"
                                />
                            </View>

                            <Button
                                label="Confirmar Atualizacao"
                                onPress={() => handleUpdate(selectedFuel, price)}
                                loading={loading}
                                accessibilityLabel="Confirmar atualizacao de preco"
                            />

                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}