import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppTheme } from '../../theme/ThemeProvider';
import UpdatePriceCard from '../../components/UpdatePriceCard';
import PriceHistoryTable from '../../components/PriceHistoryTable';
import { PrecoAtualResumo, useUpdatePriceCard } from '../../components/UpdatePriceCard/useUpdatePriceCard';
import { styles } from './styles';

type UpdatePriceRouteParams = {
    stationId: string;
    stationName: string;
    currentPrices: PrecoAtualResumo[];
};

export default function UpdatePriceScreen() {
    const { colors } = useAppTheme();
    const navigation = useNavigation();
    const route = useRoute<any>();

    const { stationId, stationName, currentPrices } = route.params as UpdatePriceRouteParams;
    const [activeFuelName, setActiveFuelName] = useState<string | null>(null);

    const handleSuccess = () => {
        (navigation.navigate as any)('StationList', { refreshKey: Date.now() });
    };

    const {
        fuelTypes,
        selectedFuel,
        price,
        loading,
        setSelectedFuel,
        handlePriceChange,
        handleUpdate,
        parsePriceToNumber,
    } = useUpdatePriceCard({ stationId, currentPrices, onSuccess: handleSuccess });

    useEffect(() => {
        if (fuelTypes.length > 0 && selectedFuel) {
            const fuel = fuelTypes.find((t) => t.id === selectedFuel);
            if (fuel) {
                setActiveFuelName(fuel.name);
            }
        }
    }, [selectedFuel, fuelTypes]);

    const isFormValid = Boolean(selectedFuel) && Boolean(price) && parsePriceToNumber(price) > 0;

    return (
        <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <FontAwesome6 name="arrow-left" size={20} iconStyle='solid' color={colors.textPrimary} />
                </TouchableOpacity>

                <View style={styles.headerTextContainer}>
                    <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Atualizar preço</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]} numberOfLines={1}>
                        {stationName}
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={() => handleUpdate(selectedFuel, price)}
                    disabled={!isFormValid || loading}
                    style={[
                        styles.backButton,
                        { opacity: !isFormValid || loading ? 0.35 : 1, alignItems: 'center', justifyContent: 'center' },
                    ]}
                    activeOpacity={0.7}
                >
                    {loading ? (
                        <ActivityIndicator color={colors.primary} size="small" />
                    ) : (
                        <FontAwesome6 name="check" size={20} iconStyle='solid' color={colors.textPrimary} />
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

                <PriceHistoryTable stationId={stationId} selectedFuelName={activeFuelName} />
            </ScrollView>
        </SafeAreaView>
    );
}