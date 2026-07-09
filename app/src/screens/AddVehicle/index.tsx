import React from 'react';
import { 
    View, Text, TouchableOpacity, TextInput, ActivityIndicator, 
    Keyboard, ScrollView, KeyboardAvoidingView, Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useAppTheme } from '../../theme/ThemeProvider';
import { styles } from './styles';
import { useKeyboardPadding } from '../../utils/keyboardPadding';
import { useAddVehicle } from './useAddVehicle';
import { CustomAlert } from '../../components/Alert';

export default function AddVehicleScreen() {
    const { colors, isDark } = useAppTheme();
    const { keyboardPadding } = useKeyboardPadding();
    const {
        name, setName,
        plate, setPlate,
        tankCapacity, setTankCapacity,
        loading, isFormValid,
        handleSave, goBack,
        isEditing, isAlertVisible, requestDelete, confirmDelete, cancelDelete
    } = useAddVehicle();

    return (
        <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: colors.background }]}>
            
            <View style={styles.header}>
                <TouchableOpacity onPress={goBack} style={styles.headerActionButton}>
                    <Feather name="arrow-left" size={24} color={colors.textPrimary} />
                </TouchableOpacity>
                <View style={styles.headerTitleContainer}>
                    <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
                        {isEditing ? 'Editar Veículo' : 'Novo Veículo'}
                    </Text>
                </View>
                <View style={styles.headerActionButton} />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={[styles.container, { paddingBottom: keyboardPadding }]}
            >
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.scrollContent}
                >
                    <TouchableOpacity activeOpacity={1} onPress={Keyboard.dismiss} style={styles.cardContent}>
                        
                        <View style={styles.section}>
                            <Text style={[styles.label, { color: colors.textSecondary }]}>Nome do Veículo</Text>
                            <View style={[styles.inputContainer, { backgroundColor: colors.background, borderColor: colors.primary + '40' }]}>
                                <TextInput
                                    style={[styles.textInput, { color: colors.textPrimary }]}
                                    placeholder="Ex: Chevrolet Corsa Classic 2011"
                                    placeholderTextColor={colors.textSecondary + '60'}
                                    value={name}
                                    onChangeText={setName}
                                    autoCapitalize="words"
                                />
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={[styles.label, { color: colors.textSecondary }]}>Placa (Opcional)</Text>
                            <View style={[styles.inputContainer, { backgroundColor: colors.background, borderColor: colors.primary + '40' }]}>
                                <TextInput
                                    style={[styles.textInput, { color: colors.textPrimary }]}
                                    placeholder="Ex: ABC-1234"
                                    placeholderTextColor={colors.textSecondary + '60'}
                                    value={plate}
                                    onChangeText={setPlate}
                                    autoCapitalize="characters"
                                    maxLength={8}
                                />
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={[styles.label, { color: colors.textSecondary }]}>Capacidade do Tanque</Text>
                            <View style={[styles.inputContainer, { backgroundColor: colors.background, borderColor: colors.primary + '40' }]}>
                                <TextInput
                                    style={[styles.numberInput, { color: colors.textPrimary }]}
                                    placeholder="0"
                                    placeholderTextColor={colors.textSecondary + '60'}
                                    keyboardType="numeric"
                                    value={tankCapacity}
                                    onChangeText={setTankCapacity}
                                />
                                <Text style={[styles.currencySuffix, { color: colors.textSecondary }]}>Litros</Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={[
                                styles.button,
                                {
                                    backgroundColor: colors.primary + (isDark ? '4B' : 'FF'),
                                    opacity: loading || !isFormValid ? 0.5 : 1,
                                    marginTop: 20,
                                },
                            ]}
                            onPress={handleSave}
                            disabled={loading || !isFormValid}
                            activeOpacity={0.8}
                        >
                            {loading ? (
                                <ActivityIndicator color="#FFF" size="small" />
                            ) : (
                                <>
                                    <Feather name="check" size={18} color="#FFF" />
                                    <Text style={[styles.buttonText, {color: "#FFF"}]}> Salvar veículo</Text> 
                                </>
                            )}
                        </TouchableOpacity>

                        {isEditing && (
                            <TouchableOpacity
                                style={[
                                styles.button,
                                {
                                    backgroundColor: colors.danger + (isDark ? '4B' : 'FF'),
                                    marginTop: 10,
                                },
                            ]}
                                onPress={requestDelete} 
                                activeOpacity={0.8}
                            >
                                <Feather name="trash-2" size={18} color="#FFF" />
                                <Text style={[styles.buttonText, {color: "#FFF"}]}> Excluir veículo</Text> 
                            </TouchableOpacity>
                        )}

                        {/* Renderize o alerta customizado no final da hierarquia da tela */}
                        <CustomAlert 
                            visible={isAlertVisible}
                            title="Atenção"
                            message="Tem certeza que deseja excluir este veículo? Todos os registros de abastecimento associados a ele também serão removidos."
                            confirmText="Excluir"
                            isDestructive={true}
                            onConfirm={confirmDelete}
                            onCancel={cancelDelete}
                        />

                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}