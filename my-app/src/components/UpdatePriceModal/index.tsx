import React, { useState, useEffect } from 'react';
import { 
    ActivityIndicator,
    Keyboard,
    Modal,
    Platform,
    Pressable,
    StyleProp,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    ViewStyle,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAppTheme } from '../../theme/ThemeProvider';
import { styles } from './styles';
import { PrecoAtualResumo, useUpdatePriceModal } from './useUpdatePriceModal';
import { getReadableColor } from '../../utils/color';
import { radius, spacing, typography } from '../../theme/tokens';

interface UpdatePriceModalProps {
    visible: boolean;
    onClose: () => void;
    postoId: string;
    postoNome: string;
    precosAtuais: PrecoAtualResumo[];
    onSuccess: () => void;
}

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
    label: string;
    onPress: () => void;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    loading?: boolean;
    icon?: React.ReactNode;
    accessibilityLabel?: string;
}

/**
 * Botao base com estados de carregamento e variantes de cor.
 */
function Button({
    label,
    onPress,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    icon,
    accessibilityLabel,
}: ButtonProps) {
    const { colors } = useAppTheme();
    const isDisabled = disabled || loading;

    const containerStyles = [
        localStyles.base,
        localStyles[size],
        localStyles[variant],
        isDisabled && localStyles.disabled,
        variant === 'primary' && { backgroundColor: colors.primary },
        variant === 'secondary' && { borderColor: colors.border, backgroundColor: colors.surface },
    ];

    const textColor = variant === 'primary' ? '#FFFFFF' : colors.textPrimary;

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={accessibilityLabel || label}
            onPress={onPress}
            disabled={isDisabled}
            style={({ pressed }) => [containerStyles, pressed && !isDisabled && localStyles.pressed]}
        >
            {loading ? (
                <ActivityIndicator color={textColor} />
            ) : (
                <View style={localStyles.content}>
                    {icon ? <View style={localStyles.icon}>{icon}</View> : null}
                    <Text style={[localStyles.label, { color: textColor }]}>{label}</Text>
                </View>
            )}
        </Pressable>
    );
}

interface InputProps extends TextInputProps {
    prefix?: string;
    suffix?: string;
    containerStyle?: StyleProp<ViewStyle>;
}

/**
 * Campo base com prefixo e sufixo opcionais.
 */
function Input({ prefix, suffix, containerStyle, style, ...props }: InputProps) {
    const { colors } = useAppTheme();

    return (
        <View
            style={[
                localStyles.inputContainer,
                {
                    backgroundColor: colors.background,
                    borderColor: colors.primary + '40',
                },
                containerStyle,
            ]}
        >
            {prefix ? <Text style={[localStyles.affix, { color: colors.textSecondary }]}>{prefix}</Text> : null}
            <TextInput
                {...props}
                style={[localStyles.input, { color: colors.textPrimary }, style]}
                placeholderTextColor={colors.textSecondary + '60'}
            />
            {suffix ? <Text style={[localStyles.affix, { color: colors.textSecondary }]}>{suffix}</Text> : null}
        </View>
    );
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
                                                                    ? accentColor + (isDark ? '22' : '14')
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

const localStyles = StyleSheet.create({
    base: {
        minHeight: 44,
        borderRadius: radius.md,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'transparent',
        paddingHorizontal: spacing.xl,
    },
    sm: {
        minHeight: 36,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
    },
    md: {
        paddingVertical: spacing.md,
    },
    lg: {
        paddingVertical: spacing.lg,
    },
    primary: {},
    secondary: {},
    ghost: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
    },
    disabled: {
        opacity: 0.6,
    },
    pressed: {
        opacity: 0.85,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    icon: {
        marginRight: 0,
    },
    label: {
        fontSize: typography.size.sm,
        fontWeight: typography.weight.bold,
        letterSpacing: typography.letterSpacing.tight,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: radius.lg,
        borderWidth: 1.5,
        paddingHorizontal: spacing.xl,
        minHeight: 48,
    },
    input: {
        flex: 1,
        fontSize: typography.size.xxl,
        fontWeight: typography.weight.semibold,
        textAlign: 'left',
        letterSpacing: typography.letterSpacing.tighter,
    },
    affix: {
        fontSize: typography.size.lg,
        fontWeight: typography.weight.semibold,
    },
});