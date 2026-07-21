import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createVehicle, updateVehicle, deleteVehicle } from '../../database/logService';
import { useAppTheme } from '../../theme/ThemeProvider';
import { useToast } from '../../contexts/ToastContext';

export function useAddVehicle() {
    const navigation = useNavigation();
    const route = useRoute<any>();
    const { colors, isDark } = useAppTheme();
    const { showToast } = useToast();

    const vehicleToEdit = route.params?.vehicleToEdit;
    const isEditing = !!vehicleToEdit;

    const [name, setName] = useState(vehicleToEdit?.name || '');
    const [plate, setPlate] = useState(vehicleToEdit?.plate || '');
    const [tankCapacity, setTankCapacity] = useState(vehicleToEdit?.tank_capacity?.toString() || '');
    const [loading, setLoading] = useState(false);
    const [isAlertVisible, setIsAlertVisible] = useState(false);

    const parseCapacity = (text: string) => parseFloat(text.replace(',', '.'));

    const isFormValid =
        name.trim().length > 0 &&
        tankCapacity.trim().length > 0 &&
        !isNaN(parseCapacity(tankCapacity)) &&
        parseCapacity(tankCapacity) > 0;

    const handleSave = () => {
        if (!isFormValid) return;

        setLoading(true);
        try {
            const capacityNumber = parseCapacity(tankCapacity);

            if (isEditing) {
                updateVehicle(vehicleToEdit.id, name.trim(), plate.trim(), capacityNumber);
            } else {
                createVehicle(name.trim(), plate.trim(), capacityNumber);
            }

            navigation.goBack();
        } catch (error) {
            console.error('Erro ao salvar veículo:', error);
            showToast('Não foi possível salvar o veículo. Tente novamente.', 'danger');
        } finally {
            setLoading(false);
        }
    };

    const requestDelete = () => {
        if (!isEditing || !vehicleToEdit?.id) return;
        setIsAlertVisible(true);
    };

    const confirmDelete = () => {
        setIsAlertVisible(false);
        try {
            deleteVehicle(vehicleToEdit.id);
            navigation.goBack();
        } catch (error) {
            console.error('Erro ao excluir veículo:', error);
            showToast('Não foi possível excluir o veículo. Tente novamente.', 'danger');
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