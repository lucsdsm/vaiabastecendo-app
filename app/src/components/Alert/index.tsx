import React from 'react';
import { Modal, View, Text, TouchableWithoutFeedback } from 'react-native';

import Button from '@components/Button';

import { useAppTheme } from '../../theme/ThemeProvider';

import { styles } from './styles'

interface AlertProps {
    visible: boolean;
    title: string;
    message: string;
    cancelText?: string;
    confirmText?: string;
    isDestructive?: boolean; 
    onCancel: () => void;
    onConfirm: () => void;
}

/**
 * Componente de alerta personalizado que exibe uma modal com título, mensagem e botões de ação.
 */
export function Alert({
    visible,
    title,
    message,
    cancelText = 'Cancelar',
    confirmText = 'Confirmar',
    isDestructive = false,
    onCancel,
    onConfirm,
}: AlertProps) {
    const { colors } = useAppTheme();

    return (
        <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onCancel}>
            <TouchableWithoutFeedback onPress={onCancel}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback>
                        <View style={[styles.card, { backgroundColor: colors.background }]}>                            
                            <Text style={[styles.title, { color: colors.textPrimary }]}>
                                {title}
                            </Text>                            
                            <Text style={[styles.message, { color: colors.textSecondary }]}>
                                {message}
                            </Text>
                            <View style={styles.holder}>
                                <Button title={cancelText} onPress={onCancel} variant="ghost"/>
                                <Button title={confirmText} onPress={onConfirm} variant="primary"/>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}