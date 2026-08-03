import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Keyboard, ScrollView, KeyboardAvoidingView, Platform, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { useAppTheme } from '../../theme/ThemeProvider';
import { styles } from './styles';
import { useAddFuelLog } from './useAddFuelLog';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CustomAlert } from '../../components/Alert';
import FuelTypeSelector from '../../components/FuelTypeSelector';

export default function AddFuelLogScreen() {
    const { colors, isDark } = useAppTheme();
    
    const {
        odometer, setOdometer,
        pricePerLiter, handlePricePerLiterChange,
        totalPrice, handleTotalPriceChange,
        liters, handleLitersChange,
        isFullTank, setIsFullTank,
        fuelTypes, selectedFuel, setSelectedFuel,
        date, setDate,
        showDatePicker, setShowDatePicker,
        isAlertVisible, requestDelete, confirmDelete, cancelDelete,
        isFormValid, isEditing, handleSave, goBack
    } = useAddFuelLog();

    return (
        <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: colors.background }]}>
            
            <View style={styles.header}>
                <TouchableOpacity onPress={goBack} style={styles.headerActionButton}>
                    <FontAwesome6 name="arrow-left" size={24} iconStyle='solid' color={colors.textPrimary} />
                </TouchableOpacity>
                
                <View style={styles.headerTitleContainer}>
                    <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
                        {isEditing ? 'Editar abastecimento' : 'Novo abastecimento'}
                    </Text>
                </View>
                
                {/* Agrupamento dos botões da direita */}
                <View style={styles.headerRightActions}>
                    {isEditing && (
                        <TouchableOpacity 
                            onPress={requestDelete}
                            style={styles.headerActionButton}
                            activeOpacity={0.7}
                        >
                            <FontAwesome6 name="trash" size={22} iconStyle='solid' color={colors.textPrimary} />
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity 
                        onPress={handleSave} 
                        disabled={!isFormValid}
                        style={[styles.headerActionButton, { opacity: isFormValid ? 1 : 0.35 }]}
                        activeOpacity={0.7}
                    >
                        <FontAwesome6 name="check" size={24} iconStyle='solid' color={colors.textPrimary} />
                    </TouchableOpacity>
                </View>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.container}
            >
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                    <TouchableOpacity activeOpacity={1} onPress={Keyboard.dismiss} style={styles.cardContent}>

                        {/* Odômetro */}
                        <View style={styles.section}>
                            <Text style={[styles.label, { color: colors.textSecondary }]}>Odômetro Atual</Text>
                            <View style={[styles.inputContainer, { borderColor: colors.primary + '40' }]}>
                                <TextInput
                                    style={[styles.textInput, { color: colors.textPrimary }]}
                                    placeholder="Ex: 152000"
                                    placeholderTextColor={colors.textSecondary + '60'}
                                    keyboardType="numeric"
                                    value={odometer}
                                    onChangeText={setOdometer}
                                />
                                <Text style={[styles.suffix, { color: colors.textSecondary }]}>km</Text>
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={[styles.label, { color: colors.textSecondary }]}>Data do Abastecimento</Text>
                            <TouchableOpacity 
                                style={[styles.inputContainer, { borderColor: colors.primary + '40', paddingVertical: 18 }]}
                                onPress={() => setShowDatePicker(true)}
                            >
                                <FontAwesome6 name="calendar" size={20} iconStyle='solid' color={colors.textSecondary} style={{ marginRight: 12 }} />
                                <Text style={[styles.textInput, { color: colors.textPrimary, paddingVertical: 0 }]}>
                                    {date.toLocaleDateString('pt-BR')}
                                </Text>
                            </TouchableOpacity>

                            {showDatePicker && (
                                <DateTimePicker
                                    value={date}
                                    mode="date"
                                    display="default"
                                    maximumDate={new Date()}
                                    onChange={(event, selectedDate) => {
                                        setShowDatePicker(false);
                                        if (event.type === 'set' && selectedDate) {
                                            setDate(selectedDate);
                                        }
                                    }}
                                />
                            )}
                        </View>

                        {/* Tipo de Combustível */}
                        <View style={styles.section}>
                            <FuelTypeSelector
                                label="Tipo de Combustível"
                                fuelTypes={fuelTypes}
                                selectedFuel={selectedFuel}
                                onSelectFuel={setSelectedFuel}
                                variant="transparent"
                                size="regular"
                            />
                        </View>

                        <View style={styles.row}>
                            <View style={[styles.section, { flex: 1, marginRight: 8 }]}>
                                <Text style={[styles.label, { color: colors.textSecondary }]}>Preço/L</Text>
                                <View style={[styles.inputContainer, { borderColor: colors.primary + '40' }]}>
                                    <Text style={[styles.prefix, { color: colors.textSecondary }]}>R$</Text>
                                    <TextInput
                                        style={[styles.textInput, { color: colors.textPrimary }]}
                                        placeholder="0,00"
                                        placeholderTextColor={colors.textSecondary + '60'}
                                        keyboardType="numeric"
                                        value={pricePerLiter}
                                        onChangeText={handlePricePerLiterChange}
                                    />
                                </View>
                            </View>
                            <View style={[styles.section, { flex: 1, marginLeft: 8 }]}>
                                <Text style={[styles.label, { color: colors.textSecondary }]}>Valor Total</Text>
                                <View style={[styles.inputContainer, { borderColor: colors.primary + '40' }]}>
                                    <Text style={[styles.prefix, { color: colors.textSecondary }]}>R$</Text>
                                    <TextInput
                                        style={[styles.textInput, { color: colors.textPrimary }]}
                                        placeholder="0,00"
                                        keyboardType="numeric"
                                        placeholderTextColor={colors.textSecondary + '60'}
                                        value={totalPrice}
                                        onChangeText={handleTotalPriceChange}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={[styles.label, { color: colors.textSecondary }]}>Volume Abastecido</Text>
                            <View style={[styles.inputContainer, { borderColor: colors.primary + '40' }]}>
                                <TextInput
                                    style={[styles.textInput, { color: colors.textPrimary }]}
                                    placeholder="0,00"
                                    keyboardType="numeric"
                                    placeholderTextColor={colors.textSecondary + '60'}
                                    value={liters}
                                    onChangeText={handleLitersChange}
                                />
                                <Text style={[styles.suffix, { color: colors.textSecondary }]}>Litros</Text>
                            </View>
                        </View>

                        {/* Toggle de Tanque Cheio */}
                        <View style={[styles.switchContainer, { borderColor: colors.border, backgroundColor: isDark ? colors.surface : '#FFF' }]}>
                            <View style={styles.switchTextContainer}>
                                <Text style={[styles.switchTitle, { color: colors.textPrimary }]}>Encheu o Tanque?</Text>
                                <Text style={[styles.switchDesc, { color: colors.textSecondary }]}>Necessário para calcular a média de consumo real.</Text>
                            </View>
                            <Switch
                                value={isFullTank}
                                onValueChange={setIsFullTank}
                                trackColor={{ false: colors.border, true: colors.primary + '80' }}
                                thumbColor={isFullTank ? colors.primary : '#f4f3f4'}
                            />
                        </View>

                        <CustomAlert
                            visible={isAlertVisible}
                            title="Atenção!"
                            message="Tem certeza que deseja excluir este abastecimento?"
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