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
            showToast('Não foi possível salvar o veículo. Tente novamente.', {
                title: 'Erro',
                type: 'danger',
            });
        } finally {
            setLoading(false);
        }
    };

    const requestDelete = () => {
      if (!isEditing || !vehicleToEdit?.id) {
        return;
      }

      showToast(
        "Toque em “Excluir” nos próximos 5 segundos para confirmar. Esta ação não poderá ser desfeita.",
        {
          title: "Excluir veículo?",
          type: "danger",
          duration: 5000,
          confirmText: "Excluir",
          onConfirm: () => {
            try {
              deleteVehicle(vehicleToEdit.id);

              showToast("O veículo foi excluído com sucesso.", {
                title: "Veículo excluído",
                type: "success",
              });

              navigation.goBack();
            } catch (error) {
              console.error("Erro ao excluir veículo:", error);

              showToast(
                "Não foi possível excluir o veículo. Tente novamente.",
                {
                  title: "Erro ao excluir",
                  type: "danger",
                },
              );
            }
          },
        },
      );
    };

    const confirmDelete = () => {
        try {
            deleteVehicle(vehicleToEdit.id);
            navigation.goBack();
        } catch (error) {
            console.error('Erro ao excluir veículo:', error);
            showToast('Não foi possível excluir o veículo. Tente novamente.',{
                title: 'Erro',
                type: 'danger',
            });
        }
    };

    return {
        name, setName,
        plate, setPlate,
        tankCapacity, setTankCapacity,
        loading, isFormValid,
        handleSave,
        colors, isDark,
        isEditing,
        requestDelete, confirmDelete,
        goBack: () => navigation.goBack()
    };
}