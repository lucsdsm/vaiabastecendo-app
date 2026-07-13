import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getVehicles, Vehicle } from '../../database/logService'; 
import { useAppTheme } from '../../theme/ThemeProvider';

export function useFuelLog() {
    const { colors } = useAppTheme();
    const navigation = useNavigation<any>();
    
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useFocusEffect(
        useCallback(() => {
            const fetchVehicles = () => {
                const loadedVehicles = getVehicles();
                setVehicles(loadedVehicles);
                
                if (loadedVehicles.length > 0) {
                    setSelectedVehicle((prevSelected) => {
                        if (!prevSelected) return loadedVehicles[0];

                        // Busca o carro atualizado de dentro da nova lista do banco
                        const updatedVehicle = loadedVehicles.find(v => v.id === prevSelected.id);

                        // Se ele ainda existir (não foi deletado), retorna a versão atualizada dele
                        return updatedVehicle ? updatedVehicle : loadedVehicles[0];
                    });
                } else {
                    setSelectedVehicle(null);
                }
            };
            
            fetchVehicles();
        }, [])
    );

    const toggleModal = () => setIsModalVisible(!isModalVisible);

    const handleSelectVehicle = (vehicle: Vehicle) => {
        setSelectedVehicle(vehicle);
        setIsModalVisible(false); 
    };

    const handleAddVehicle = () => {
        setIsModalVisible(false);
        navigation.navigate('AddVehicle'); 
    };

    const handleEditVehicle = (vehicle: Vehicle) => {
    setIsModalVisible(false);
        navigation.navigate('AddVehicle', { vehicleToEdit: vehicle });
    };

    const handleAddFuelLog = () => {
        if (selectedVehicle) {
            navigation.navigate('AddFuelLog', { vehicleId: selectedVehicle.id });
        }
        
    };

    const goBack = () => navigation.goBack();

    return {
        colors,
        vehicles,
        selectedVehicle,
        isModalVisible,
        toggleModal,
        handleSelectVehicle,
        handleAddVehicle,
        handleEditVehicle,
        handleAddFuelLog,
        goBack
    };
}