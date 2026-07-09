import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { styles } from './styles';
import { useFuelLog } from './useFuelLog';
import { VehicleDropdown } from '../../components/VehicleDropdown';

export default function FuelLogScreen() {
    const {
        colors,
        vehicles,
        selectedVehicle,
        isModalVisible,
        toggleModal,
        handleSelectVehicle,
        handleAddVehicle,
        handleEditVehicle,
        goBack
    } = useFuelLog();

    return (
        <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: colors.background }]}>
            
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={goBack} style={styles.headerActionButton}>
                    <Feather name="arrow-left" size={24} color={colors.textPrimary} />
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={styles.headerTitleContainer} 
                    onPress={toggleModal}
                    activeOpacity={0.7}
                >
                    <Text style={[styles.headerTitle, { color: colors.textPrimary }]} numberOfLines={1}>
                        {selectedVehicle ? selectedVehicle.name : 'Selecionar veículo'}
                    </Text>
                    <Feather 
                        name={isModalVisible ? "chevron-up" : "chevron-down"} 
                        size={20} 
                        color={colors.textPrimary} 
                        style={{ marginLeft: 4 }} 
                    />
                </TouchableOpacity>
            </View>

            {/* Conteúdo */}
            <View style={styles.content}>
            </View>

            {/* Dropdown */}
            <VehicleDropdown 
                isVisible={isModalVisible}
                vehicles={vehicles}
                selectedVehicle={selectedVehicle}
                onClose={toggleModal}
                onSelectVehicle={handleSelectVehicle}
                onAddVehicle={handleAddVehicle}
                onEditVehicle={handleEditVehicle}
            />

        </SafeAreaView>
    );
}