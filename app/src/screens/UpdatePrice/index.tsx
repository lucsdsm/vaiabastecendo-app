import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppTheme } from '../../theme/ThemeProvider';
import UpdatePriceCard from '../../components/UpdatePriceCard';
import PriceHistoryTable from '../../components/PriceHistoryTable';
import { PrecoAtualResumo, useUpdatePriceCard } from '../../components/UpdatePriceCard/useUpdatePriceModal';
import { styles } from './styles';

type UpdatePriceRouteParams = {
    postoId: string;
    postoNome: string;
    precosAtuais: PrecoAtualResumo[];
};

export default function UpdatePrice() {
    const { colors } = useAppTheme();
    const navigation = useNavigation();
    const route = useRoute<any>();

    const { postoId, postoNome, precosAtuais } = route.params as UpdatePriceRouteParams;
    const [activeFuelName, setActiveFuelName] = useState<string | null>(null);

    const handleSuccess = () => {
        (navigation.navigate as any)('Home', { refreshKey: Date.now() });
    };

    const {
        fuelTypes,
        selectedFuel,
        price,
        loading,
        setSelectedFuel,
        handlePriceChange,
        handleUpdate,
    } = useUpdatePriceCard({ postoId, precosAtuais, onSuccess: handleSuccess });

    useEffect(() => {
        if (fuelTypes.length > 0 && selectedFuel) {
            const fuel = fuelTypes.find(t => t.id === selectedFuel);
            if (fuel) {
                setActiveFuelName(fuel.nome);
            }
        }
    }, [selectedFuel, fuelTypes]);

    const isFormValid = selectedFuel && price && parseFloat(price.replace(',', '.')) > 0;

    return (
        <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Feather name="arrow-left" size={24} color={colors.textPrimary} />
                </TouchableOpacity>
                
                <View style={styles.headerTextContainer}>
                    <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Atualizar preço</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]} numberOfLines={1}>
                        {postoNome}
                    </Text>
                </View>
                
                <TouchableOpacity
                    onPress={() => handleUpdate(selectedFuel, price)}
                    disabled={!isFormValid || loading}
                    style={[
                        styles.backButton, 
                        { opacity: !isFormValid || loading ? 0.35 : 1, alignItems: 'center', justifyContent: 'center' }
                    ]}
                    activeOpacity={0.7}
                >
                    {loading ? (
                        <ActivityIndicator color={colors.primary} size="small" />
                    ) : (
                        <Feather name="check" size={24} color={colors.primary} />
                    )}
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <UpdatePriceCard
                    fuelTypes={fuelTypes}
                    selectedFuel={selectedFuel}
                    price={price}
                    setSelectedFuel={setSelectedFuel}
                    handlePriceChange={handlePriceChange}
                />
                
                <PriceHistoryTable 
                    postoId={postoId} 
                    selectedFuelName={activeFuelName} 
                />
            </ScrollView>
        </SafeAreaView>
    );
}