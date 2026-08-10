import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

import { useAppTheme } from '@theme/ThemeProvider';

import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

import { styles } from './styles';

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
            style={styles.overlay} 
            activeOpacity={1} 
            onPress={onClose}>
            <View style={[styles.content, { backgroundColor: colors.surface }]}>
                <View style={[styles.pointer, { borderBottomColor: colors.surface }]} />

                <FlatList
                    data={vehicles}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {
                        const isSelected = selectedVehicle?.id === item.id;

                        return (
                            <TouchableOpacity 
                                style={styles.item}
                                onPress={() => {
                                    if (isSelected) {
                                        onEditVehicle(item);
                                    } else {
                                        onSelectVehicle(item);
                                    }
                                }}
                            >
                                <FontAwesome6 name="car" size={16} iconStyle='solid' color={colors.textSecondary} />
                                <Text style={[styles.text, { color: colors.textPrimary }]} numberOfLines={1}>
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
                    style={styles.button}
                    onPress={onAddVehicle}>
                    <FontAwesome6 name="circle-plus" size={16} iconStyle='solid' color={colors.primary} />
                    <Text style={[styles.modal, { color: colors.primary }]}>
                        Adicionar veículo
                    </Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}