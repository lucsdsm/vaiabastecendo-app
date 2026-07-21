import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { styles } from './styles';
import { useFuelLog } from './useFuelLog';
import { VehicleDropdown } from '../../components/VehicleDropdown';
import { FuelLogCard } from '../../components/FuelLogCard';
import EmptyState from '@components/EmptyState';
import LoadingState from '../../components/LoadingState';

export default function FuelLogScreen() {
    const insets = useSafeAreaInsets();
    const {
        colors,
        vehicles,
        logs,
        selectedVehicle,
        isModalVisible,
        toggleModal,
        handleSelectVehicle,
        handleAddVehicle,
        handleEditVehicle,
        handleAddFuelLog,
        handleEditFuelLog,
        goBack,
        isInitializing,
    } = useFuelLog();

    return (
        <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
            
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
            
            <View style={[styles.content, { flex: 1 }]}> 
                {isInitializing ? (
                    <LoadingState message="Carregando histórico..." iconName="clipboard-list" />
                ) : (
   
                    <FlatList
                        data={logs}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={[
                            logs.length === 0 && { flex: 1, justifyContent: 'center'}
                        ]}
                        ListEmptyComponent={
                            selectedVehicle ? (
                                <EmptyState 
                                    title="Nenhum abastecimento."
                                    message="Ainda não há abastecimentos registrados para este veículo."
                                    variant="neutral"
                                    iconName="clipboard" 
                                />
                            ) : null
                        }
                        renderItem={({ item }) => (
                            <FuelLogCard 
                                data={item} 
                                onPress={() => handleEditFuelLog(item)} 
                            />
                        )}
                    />
                )}
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

            {!isInitializing && selectedVehicle && (
                <TouchableOpacity 
                    style={[styles.fab, { backgroundColor: colors.primary }]}
                    onPress={handleAddFuelLog}
                    activeOpacity={0.8}
                >
                    <FontAwesome5 name="gas-pump" size={20} color="#FFF" />
                </TouchableOpacity>
            )}

        </View>
    );
}