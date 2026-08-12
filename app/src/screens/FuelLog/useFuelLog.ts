import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { addFuelLog, getVehicleLogs, getVehicles, Vehicle } from '@database/logService'; 
import { useAppTheme } from '@theme/ThemeProvider';
import { FuelLog } from '@database/logService';

export function useFuelLog() {
    const { colors } = useAppTheme();
    const navigation = useNavigation<any>();
    
    const [isInitializing, setIsInitializing] = useState(true);
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [logs, setLogs] = useState<FuelLog[]>([]);

    useFocusEffect(
        useCallback(() => {
            const fetchVehicles = () => {
                const loadedVehicles = getVehicles();
                setVehicles(loadedVehicles);
                
                if (loadedVehicles.length > 0) {
                    setSelectedVehicle((prevSelected) => {
                        if (!prevSelected) return loadedVehicles[0];
                        const updatedVehicle = loadedVehicles.find(v => v.id === prevSelected.id);
                        return updatedVehicle ? updatedVehicle : loadedVehicles[0];
                    });
                } else {
                    setSelectedVehicle(null);
                    setIsInitializing(false);
                }
            };
            
            fetchVehicles();
        }, [])
    );

    useEffect(() => {
        if (selectedVehicle) {
            setLogs(getVehicleLogs(selectedVehicle.id));
            setIsInitializing(false);
        } else {
            setLogs([]);
        }
    }, [selectedVehicle]);

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

    const handleEditFuelLog = (log: FuelLog) => {
        if (selectedVehicle) {
            navigation.navigate('AddFuelLog', {
                vehicleId: selectedVehicle.id,
                logToEdit: log
            });
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
        handleEditFuelLog,
        logs,
        goBack,
        isInitializing
    };
}