import React from 'react';
import { Modal, View, Text, TouchableWithoutFeedback } from 'react-native';
import { useAppTheme } from '../../theme/ThemeProvider';
import { styles } from './styles'
import Button from '../Button';

interface CustomAlertProps {
    visible: boolean;
    title: string;
    message: string;
    cancelText?: string;
    confirmText?: string;
    isDestructive?: boolean; 
    onCancel: () => void;
    onConfirm: () => void;
}

export function CustomAlert({
    visible,
    title,
    message,
    cancelText = 'Cancelar',
    confirmText = 'Confirmar',
    isDestructive = false,
    onCancel,
    onConfirm,
}: CustomAlertProps) {
    const { colors } = useAppTheme();

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onCancel}
        >
            <TouchableWithoutFeedback onPress={onCancel}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback>
                        <View style={[styles.alertCard, { backgroundColor: colors.background }]}>
                            
                            <Text style={[styles.title, { color: colors.textPrimary }]}>
                                {title}
                            </Text>
                            
                            <Text style={[styles.message, { color: colors.textSecondary }]}>
                                {message}
                            </Text>

                            <View style={styles.buttonContainer}>
                                <Button
                                    title={cancelText}
                                    onPress={onCancel}
                                    variant="ghost"
                                />

                                <Button
                                    title={confirmText}
                                    onPress={onConfirm}
                                    variant="primary"
                                />
                            </View>

                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}