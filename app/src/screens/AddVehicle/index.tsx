import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Keyboard, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAddVehicle } from './useAddVehicle';

import { useAppTheme } from '@theme/ThemeProvider';

import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

import { styles } from './styles';

/**
 * Exibe o formulário para adicionar um novo veículo.
 */
export default function AddVehicleScreen() {
    const { colors } = useAppTheme();
    const {
        name, setName,
        plate, setPlate,
        tankCapacity, setTankCapacity,
        loading, isFormValid,
        handleSave, goBack,
        isEditing, requestDelete
    } = useAddVehicle();

    return (
        <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={goBack} style={styles.header}>
                    <FontAwesome6 name="arrow-left" size={20} iconStyle='solid' color={colors.textPrimary} />
                </TouchableOpacity>
                
                <View style={styles.wrapper}>
                    <Text style={[styles.title, { color: colors.textPrimary }]}>
                        {isEditing ? 'Editar veículo' : 'Novo veículo'}
                    </Text>
                </View>

                {/* Bloco de ações na direita */}
                <View style={styles.right}>
                    {isEditing && (
                        <TouchableOpacity 
                            onPress={requestDelete} 
                            style={styles.action}
                            activeOpacity={0.7}
                        >
                            <FontAwesome6 name="trash" size={20} iconStyle='solid' color={colors.textPrimary} />
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity 
                        onPress={handleSave} 
                        disabled={!isFormValid || loading}
                        style={[
                            styles.action, 
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
                    contentContainerStyle={styles.scroll}
                >
                    <TouchableOpacity activeOpacity={1} onPress={Keyboard.dismiss} style={styles.content}>
                        
                        <View style={styles.section}>
                            <Text style={[styles.label, { color: colors.textSecondary }]}>Nome do Veículo</Text>
                            <View style={[styles.input, { backgroundColor: colors.background, borderColor: colors.primary + '40' }]}>
                                <TextInput
                                    style={[styles.text, { color: colors.textPrimary }]}
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
                            <View style={[styles.input, { backgroundColor: colors.background, borderColor: colors.primary + '40' }]}>
                                <TextInput
                                    style={[styles.text, { color: colors.textPrimary }]}
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
                            <View style={[styles.input, { backgroundColor: colors.background, borderColor: colors.primary + '40' }]}>
                                <TextInput
                                    style={[styles.number, { color: colors.textPrimary }]}
                                    placeholder="0"
                                    placeholderTextColor={colors.textSecondary + '60'}
                                    keyboardType="numeric"
                                    value={tankCapacity}
                                    onChangeText={setTankCapacity}
                                />
                                <Text style={[styles.suffix, { color: colors.textSecondary }]}>Litros</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}