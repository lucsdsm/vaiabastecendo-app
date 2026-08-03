import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { useAppTheme } from '../../theme/ThemeProvider'; // Ajuste o caminho
import { styles } from './styles';

// Tipagem básica (importe do seu service se preferir)
interface Vehicle {
    id: string;
    name: string;
    plate: string | null;
    tank_capacity: number;
}

interface VehicleDropdownProps {
    isVisible: boolean;
    vehicles: Vehicle[];
    selectedVehicle: Vehicle | null;
    onClose: () => void;
    onSelectVehicle: (vehicle: Vehicle) => void;
    onAddVehicle: () => void;
    onEditVehicle: (vehicle: Vehicle) => void;
}

export function VehicleDropdown({
    isVisible,
    vehicles,
    selectedVehicle,
    onClose,
    onSelectVehicle,
    onAddVehicle,
    onEditVehicle
}: VehicleDropdownProps) {
    const { colors } = useAppTheme();

    if (!isVisible) return null;

    return (
        <TouchableOpacity 
            style={styles.dropdownOverlay} 
            activeOpacity={1} 
            onPress={onClose}
        >
            <View style={[styles.dropdownContent, { backgroundColor: colors.surface }]}>
                <View style={[styles.dropdownPointer, { borderBottomColor: colors.surface }]} />

                <FlatList
                    data={vehicles}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {
                        const isSelected = selectedVehicle?.id === item.id;

                        return (
                            <TouchableOpacity 
                                style={styles.vehicleItem}
                                onPress={() => {
                                    if (isSelected) {
                                        onEditVehicle(item); // Se já está selecionado, edita
                                    } else {
                                        onSelectVehicle(item); // Se não, apenas seleciona
                                    }
                                }}
                            >
                                <FontAwesome6 name="car" size={16} iconStyle='solid' color={colors.textSecondary} />
                                <Text style={[styles.vehicleItemText, { color: colors.textPrimary }]} numberOfLines={1}>
                                    {item.name}
                                </Text>
                                {isSelected && (
                                    <FontAwesome6 name="pencil" size={16} iconStyle='solid' color={colors.primary} />
                                )}
                            </TouchableOpacity>
                        );
                    }}
                />

                <TouchableOpacity 
                    style={styles.addVehicleModalButton}
                    onPress={onAddVehicle}
                >
                    <FontAwesome6 name="circle-plus" size={16} iconStyle='solid' color={colors.primary} />
                    <Text style={[styles.addVehicleModalText, { color: colors.primary }]}>
                        Adicionar veículo
                    </Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}