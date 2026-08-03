import React from 'react';
import { 
    View, Text, TouchableOpacity, TextInput, 
    Keyboard, ScrollView, KeyboardAvoidingView, Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { useAppTheme } from '../../theme/ThemeProvider';
import { styles } from './styles';
import { useAddVehicle } from './useAddVehicle';
import { CustomAlert } from '../../components/Alert';

export default function AddVehicleScreen() {
    const { colors, isDark } = useAppTheme();
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
                    <FontAwesome6 name="arrow-left" size={20} iconStyle='solid' color={colors.textPrimary} />
                </TouchableOpacity>
                
                <View style={styles.headerTitleContainer}>
                    <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
                        {isEditing ? 'Editar veículo' : 'Novo veículo'}
                    </Text>
                </View>

                {/* Bloco de ações na direita */}
                <View style={styles.headerRightActions}>
                    {isEditing && (
                        <TouchableOpacity 
                            onPress={requestDelete} 
                            style={styles.headerActionButton}
                            activeOpacity={0.7}
                        >
                            <FontAwesome6 name="trash" size={20} iconStyle='solid' color={colors.textPrimary} />
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity 
                        onPress={handleSave} 
                        disabled={!isFormValid || loading}
                        style={[
                            styles.headerActionButton, 
                            { opacity: !isFormValid || loading ? 0.35 : 1 }
                        ]}
                        activeOpacity={0.7}
                    >
                        <FontAwesome6 name="check" size={20} iconStyle='solid' color={colors.textPrimary} />
                    </TouchableOpacity>
                </View>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.container}
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

                        <CustomAlert 
                            visible={isAlertVisible}
                            title="Atenção!"
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