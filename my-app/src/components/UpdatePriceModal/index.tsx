import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAppTheme } from '../../theme/ThemeProvider';
import axios from 'axios';

interface FuelType {
    id: number;
    nome: string;
    cor: string;
}

interface UpdatePriceModalProps {
    visible: boolean;
    onClose: () => void;
    postoId: string;
    postoNome: string;
    onSuccess: () => void;
}

export default function UpdatePriceModal({ visible, onClose, postoId, postoNome, onSuccess }: UpdatePriceModalProps) {
    const { colors, isDark } = useAppTheme();
    const [fuelTypes, setFuelTypes] = useState<FuelType[]>([]);
    const [selectedFuel, setSelectedFuel] = useState<number | null>(null);
    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (visible) {
            fetchFuelTypes();
        }
    }, [visible]);

    const fetchFuelTypes = async () => {
        try {
            const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/tipos-combustivel/`);
            setFuelTypes(response.data);
            if (response.data.length > 0) setSelectedFuel(response.data[0].id);
        } catch (error) {
            console.error("Erro ao buscar tipos de combustível", error);
        }
    };

    const handlePriceChange = (text: string) => {
        // 1. Remove qualquer coisa que não seja número, ponto ou vírgula
        let cleaned = text.replace(/[^0-9.,]/g, '');

        // 2. Troca ponto por vírgula para manter o padrão visual brasileiro
        cleaned = cleaned.replace('.', ',');

        // 3. Garante que exista no máximo UMA vírgula
        const parts = cleaned.split(',');
        if (parts.length > 2) {
            cleaned = parts[0] + ',' + parts.slice(1).join('');
        }

        // 4. Limita a 2 casas decimais (pois nosso backend foi configurado com decimal_places=2)
        if (cleaned.includes(',')) {
            const [int, dec] = cleaned.split(',');
            cleaned = `${int},${dec.substring(0, 2)}`;
        }

        setPrice(cleaned);
    };

    // ATUALIZE sua função handleUpdate para esta:
    const handleUpdate = async () => {
        if (!selectedFuel || !price) return;

        // Converte a nossa string "5,89" em um número real 5.89 para o Python
        const numericPrice = parseFloat(price.replace(',', '.'));

        // Validação de segurança antes de chamar a API
        if (isNaN(numericPrice) || numericPrice <= 0) {
            Alert.alert("Ops!", "Por favor, insira um preço válido maior que zero.");
            return;
        }

        setLoading(true);
        try {
            await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/atualizar-preco/`, {
                posto: postoId,
                tipo_combustivel: selectedFuel,
                preco: numericPrice
            });
            
            // Se chegou aqui, a API aceitou!
            setPrice('');
            onSuccess(); // Dispara a atualização da FlatList
            onClose();   // Fecha o popup
            
        } catch (error: any) {
            // Se a API recusar, nós pegamos o erro e avisamos o usuário!
            console.error("Erro da API:", error.response?.data || error.message);
            Alert.alert(
                "Erro ao salvar",
                "Não foi possível atualizar o preço. Verifique sua conexão e tente novamente."
            );
        } finally {
            // O finally SEMPRE roda (dando erro ou sucesso), garantindo que o spinner do botão pare.
            setLoading(false);
        }
    };

    return (
        <Modal visible={visible} animationType="fade" transparent>
            <View style={styles.overlay}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={[styles.modalContent, { backgroundColor: colors.surface }]}
                >
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
                            {fuelTypes.map((type) => (
                                <TouchableOpacity
                                    key={type.id}
                                    style={[
                                        styles.fuelOption,
                                        { borderColor: selectedFuel === type.id ? type.cor : 'transparent', backgroundColor: type.cor + '15' }
                                    ]}
                                    onPress={() => setSelectedFuel(type.id)}
                                >
                                    <Text style={[styles.fuelOptionText, { color: selectedFuel === type.id ? type.cor : colors.textSecondary }]}>
                                        {type.nome}
                                    </Text>
                                </TouchableOpacity>
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
                        onPress={handleUpdate}
                        disabled={loading}
                    >
                        {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.submitButtonText}>Confirmar Atualização</Text>}
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    modalContent: { borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, paddingBottom: 40 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
    title: { fontSize: 22, fontWeight: '800' },
    subtitle: { fontSize: 14, marginBottom: 25 },
    section: { marginBottom: 20 },
    label: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
    fuelGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    fuelOption: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, borderWidth: 2 },
    fuelOptionText: { fontWeight: '700', fontSize: 14 },
    input: { borderRadius: 15, padding: 18, fontSize: 24, fontWeight: '800', textAlign: 'center', borderWidth: 1 },
    submitButton: { borderRadius: 15, padding: 18, alignItems: 'center', marginTop: 10 },
    submitButtonText: { color: '#FFF', fontSize: 16, fontWeight: '700' }
});