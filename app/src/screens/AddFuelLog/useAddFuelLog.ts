import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCombustivel } from '../../contexts/CombustivelContext';
import { addFuelLog, updateFuelLog, getVehicleLogs, deleteFuelLog } from '../../database/logService';

export function useAddFuelLog() {
    const navigation = useNavigation();
    const route = useRoute<any>();
    
    const vehicleId = route.params?.vehicleId;
    const logToEdit = route.params?.logToEdit;
    const isEditing = !!logToEdit;

    const [odometer, setOdometer] = useState(logToEdit?.odometer?.toString() || '');
    const [pricePerLiter, setPricePerLiter] = useState(logToEdit?.price_per_liter?.toString() || '');
    const [totalPrice, setTotalPrice] = useState(logToEdit?.total_price?.toString() || '');
    const [liters, setLiters] = useState(logToEdit?.liters?.toString() || '');
    const [isFullTank, setIsFullTank] = useState(logToEdit?.is_full === 1);
    
    const [date, setDate] = useState(logToEdit ? new Date(logToEdit.date) : new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const { fuelTypes, refetchFuelTypes, loading: isFuelLoading } = useCombustivel();
    const [selectedFuel, setSelectedFuel] = useState<number | null>(null);

    const [isAlertVisible, setIsAlertVisible] = useState(false);

    useEffect(() => {
        if (fuelTypes.length === 0 && !isFuelLoading) {
            refetchFuelTypes();
        }
    }, []);

    useEffect(() => {
        if (fuelTypes.length > 0) {
            if (isEditing && logToEdit?.fuel_type) {
                const matchedFuel = fuelTypes.find(f => f.nome === logToEdit.fuel_type);
                setSelectedFuel(matchedFuel ? matchedFuel.id : fuelTypes[0].id);
            } else if (!selectedFuel) {
                setSelectedFuel(fuelTypes[0].id);
            }
        }
    }, [fuelTypes, isEditing, logToEdit]);

    const parseNumber = (text: string) => parseFloat(text.replace(',', '.')) || 0;
    const formatNumber = (num: number) => num > 0 ? num.toFixed(2).replace('.', ',') : '';

    const handlePricePerLiterChange = (text: string) => {
        setPricePerLiter(text);
        const price = parseNumber(text);
        const total = parseNumber(totalPrice);
        if (price > 0 && total > 0) setLiters(formatNumber(total / price));
    };

    const handleTotalPriceChange = (text: string) => {
        setTotalPrice(text);
        const total = parseNumber(text);
        const price = parseNumber(pricePerLiter);
        if (price > 0 && total > 0) setLiters(formatNumber(total / price));
    };

    const handleLitersChange = (text: string) => {
        setLiters(text);
        const lts = parseNumber(text);
        const price = parseNumber(pricePerLiter);
        if (price > 0 && lts > 0) setTotalPrice(formatNumber(lts * price));
    };

    const requestDelete = () => {
        if (!isEditing || !logToEdit?.id) return;
        setIsAlertVisible(true);
    };
    
    const confirmDelete = () => {
        setIsAlertVisible(false);
        try {
            deleteFuelLog(logToEdit.id);
            navigation.goBack();
        } catch (error) {
            console.error("Erro ao excluir abastecimento:", error);
        }
    };
    
    const cancelDelete = () => {
        setIsAlertVisible(false);
    };

    const isFormValid = 
        vehicleId && 
        selectedFuel && 
        parseNumber(odometer) > 0 && 
        parseNumber(liters) > 0 && 
        parseNumber(totalPrice) > 0;

    const handleSave = () => {
        if (!isFormValid) return;

        const currentOdo = parseNumber(odometer);
        const currentLiters = parseNumber(liters);
        const currentPrice = parseNumber(pricePerLiter);
        const currentTotal = parseNumber(totalPrice);
        const fuelName = fuelTypes.find(f => f.id === selectedFuel)?.nome || 'Desconhecido';

        const history = getVehicleLogs(vehicleId);
        const filteredHistory = isEditing ? history.filter(log => log.id !== logToEdit.id) : history;

        for (const pastLog of filteredHistory) {
            const pastDate = new Date(pastLog.date);
            
            const dateStr = date.toISOString().split('T')[0];
            const pastDateStr = pastDate.toISOString().split('T')[0];

            if (dateStr > pastDateStr && currentOdo <= pastLog.odometer) {
                Alert.alert("Erro no Odômetro", `O odômetro não pode ser menor ou igual a ${pastLog.odometer} km, que foi registrado em ${pastDate.toLocaleDateString('pt-BR')}.`);
                return;
            }
            if (dateStr < pastDateStr && currentOdo >= pastLog.odometer) {
                Alert.alert("Erro no Odômetro", `Para esta data, o odômetro deve ser menor que ${pastLog.odometer} km, que foi registrado em ${pastDate.toLocaleDateString('pt-BR')}.`);
                return;
            }
        }

        try {
            if (isEditing) {
                updateFuelLog({
                    id: logToEdit.id,
                    vehicle_id: vehicleId,
                    date: date.toISOString(),
                    odometer: currentOdo,
                    liters: currentLiters,
                    price_per_liter: currentPrice,
                    total_price: currentTotal,
                    is_full: isFullTank ? 1 : 0,
                    fuel_type: fuelName
                });
            } else {
                addFuelLog({
                    vehicle_id: vehicleId,
                    date: date.toISOString(),
                    odometer: currentOdo,
                    liters: currentLiters,
                    price_per_liter: currentPrice,
                    total_price: currentTotal,
                    is_full: isFullTank ? 1 : 0,
                    fuel_type: fuelName
                });
            }
            navigation.goBack();
        } catch (error) {
            console.error("Erro ao salvar abastecimento:", error);
        }
    };

    return {
        odometer, setOdometer,
        pricePerLiter, handlePricePerLiterChange,
        totalPrice, handleTotalPriceChange,
        liters, handleLitersChange,
        isFullTank, setIsFullTank,
        fuelTypes, selectedFuel, setSelectedFuel,
        date, setDate,
        showDatePicker, setShowDatePicker,
        isFormValid, handleSave, isEditing,
        isAlertVisible, requestDelete, confirmDelete, cancelDelete,
        goBack: () => navigation.goBack()
    };
}