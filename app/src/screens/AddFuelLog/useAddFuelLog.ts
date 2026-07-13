import { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCombustivel } from '../../contexts/CombustivelContext';
import { addFuelLog } from '../../database/logService';

export function useAddFuelLog() {
    const navigation = useNavigation();
    const route = useRoute<any>();
    
    const vehicleId = route.params?.vehicleId;

    const [odometer, setOdometer] = useState('');
    const [pricePerLiter, setPricePerLiter] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [liters, setLiters] = useState('');
    const [isFullTank, setIsFullTank] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    
    const { fuelTypes, refetchFuelTypes, loading: isFuelLoading } = useCombustivel();
    const [selectedFuel, setSelectedFuel] = useState<number | null>(null);

    useEffect(() => {
        if (fuelTypes.length === 0 && !isFuelLoading) {
            refetchFuelTypes();
        }
    }, []);

    useEffect(() => {
        if (fuelTypes.length > 0 && !selectedFuel) {
            setSelectedFuel(fuelTypes[0].id);
        }
    }, [fuelTypes, selectedFuel]);

    const parseNumber = (text: string) => parseFloat(text.replace(',', '.')) || 0;
    const formatNumber = (num: number) => num > 0 ? num.toFixed(2).replace('.', ',') : '';

    const handlePricePerLiterChange = (text: string) => {
        setPricePerLiter(text);
        const price = parseNumber(text);
        const total = parseNumber(totalPrice);
        
        if (price > 0 && total > 0) {
            setLiters(formatNumber(total / price));
        }
    };

    const handleTotalPriceChange = (text: string) => {
        setTotalPrice(text);
        const total = parseNumber(text);
        const price = parseNumber(pricePerLiter);
        
        if (price > 0 && total > 0) {
            setLiters(formatNumber(total / price));
        }
    };

    const handleLitersChange = (text: string) => {
        setLiters(text);
        const lts = parseNumber(text);
        const price = parseNumber(pricePerLiter);
        
        if (price > 0 && lts > 0) {
            setTotalPrice(formatNumber(lts * price));
        }
    };

    const isFormValid = 
        vehicleId && 
        selectedFuel && 
        parseNumber(odometer) > 0 && 
        parseNumber(liters) > 0 && 
        parseNumber(totalPrice) > 0;

    const handleSave = () => {
        if (!isFormValid) return;

        const fuelName = fuelTypes.find(f => f.id === selectedFuel)?.nome || 'Desconhecido';

        try {
            addFuelLog({
                vehicle_id: vehicleId,
                odometer: parseNumber(odometer),
                liters: parseNumber(liters),
                price_per_liter: parseNumber(pricePerLiter),
                total_price: parseNumber(totalPrice),
                is_full: isFullTank ? 1 : 0,
                fuel_type: fuelName,
                date: date.toISOString(),
            });
            
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
        isFormValid, handleSave,
        date, setDate,
        showDatePicker, setShowDatePicker,
        goBack: () => navigation.goBack()
    };
}