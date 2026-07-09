import React from 'react';
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useAppTheme } from '../../theme/ThemeProvider';
import { styles } from './styles'

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
                                <TouchableOpacity 
                                    style={[styles.button, styles.cancelButton, { borderColor: colors.border }]} 
                                    onPress={onCancel}
                                >
                                    <Text style={[styles.buttonText, { color: colors.textPrimary }]}>
                                        {cancelText}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    style={[
                                        styles.button, 
                                        { backgroundColor: isDestructive ? colors.danger : colors.primary }
                                    ]} 
                                    onPress={onConfirm}
                                >
                                    <Text style={[styles.buttonText, { color: '#FFF' }]}>
                                        {confirmText}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}