import { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createVehicle, updateVehicle, deleteVehicle } from '../../database/logService';
import { useAppTheme } from '../../theme/ThemeProvider';

export function useAddVehicle() {
    const navigation = useNavigation();
    const route = useRoute<any>();
    const { colors, isDark } = useAppTheme();
    
    const vehicleToEdit = route.params?.vehicleToEdit;
    const isEditing = !!vehicleToEdit;

    const [name, setName] = useState(vehicleToEdit?.name || '');
    const [plate, setPlate] = useState(vehicleToEdit?.plate || '');
    const [tankCapacity, setTankCapacity] = useState(vehicleToEdit?.tank_capacity?.toString() || '');
    const [loading, setLoading] = useState(false);
    const [isAlertVisible, setIsAlertVisible] = useState(false);

    const isFormValid = name.trim().length > 0 && tankCapacity.trim().length > 0;

    const handleSave = () => {
        if (!isFormValid) return;
        
        setLoading(true);
        try {
            const capacityNumber = parseFloat(tankCapacity.replace(',', '.'));
            
            if (isEditing) {
                updateVehicle(vehicleToEdit.id, name, plate, capacityNumber);
            } else {
                createVehicle(name, plate, capacityNumber);
            }
            
            navigation.goBack();
        } catch (error) {
            console.error("Erro ao salvar veículo:", error);
        } finally {
            setLoading(false);
        }
    };

    const requestDelete = () => {
        if (!isEditing || !vehicleToEdit?.id) return;
        setIsAlertVisible(true);
    };

    const confirmDelete = () => {
        setIsAlertVisible(false); // Fecha o modal
        try {
            deleteVehicle(vehicleToEdit.id);
            navigation.goBack();
        } catch (error) {
            console.error("Erro ao excluir veículo:", error);
        }
    };

    const cancelDelete = () => {
        setIsAlertVisible(false);
    };

    return {
        name, setName,
        plate, setPlate,
        tankCapacity, setTankCapacity,
        loading, isFormValid,
        handleSave,
        colors, isDark,
        isEditing,
        isAlertVisible, requestDelete, confirmDelete, cancelDelete,
        goBack: () => navigation.goBack()
    };
}