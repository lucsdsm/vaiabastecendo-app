import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useFuelLog } from './useFuelLog';

import { VehicleDropdown } from '@components/VehicleDropdown';
import { FuelLogCard } from '@components/FuelLogCard';

import EmptyState from '@components/EmptyState';
import LoadingState from '@components/LoadingState';
import Footer from '@components/Footer';

import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

import { styles } from './styles';

/**
 * Tela de histórico de abastecimentos.
 */

export default function FuelLogScreen() {
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
        <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: colors.background }]}>
            
            <View style={styles.header}>
                <TouchableOpacity onPress={goBack} style={styles.action}>
                    <FontAwesome6 name="arrow-left" size={20} iconStyle='solid' color={colors.textPrimary} />
                </TouchableOpacity>
            
                <TouchableOpacity 
                    style={styles.wrapper} 
                    onPress={toggleModal}
                    activeOpacity={0.7}>
                    <Text style={[styles.title, { color: colors.textPrimary }]} numberOfLines={1}>
                        {selectedVehicle ? selectedVehicle.name : 'Selecionar veículo'}
                    </Text>
                    <FontAwesome6 
                        name={isModalVisible ? "chevron-up" : "chevron-down"} 
                        size={14} 
                        iconStyle='solid'
                        color={colors.textPrimary} 
                        style={{ marginLeft: 8 }} 
                    />
                </TouchableOpacity>
            </View>
            
            <View style={[styles.content, { flex: 1 }]}> 
                {isInitializing ? (
                    <LoadingState message="Carregando histórico..." iconName="run" />
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
                                title="Nenhum abastecimento"
                                message="Ainda não há abastecimentos registrados para este veículo."
                                iconName="looking"
                                />
                            ) : (
                                <EmptyState
                                title="Nenhum veículo selecionado"
                                message="Selecione um veículo para visualizar o histórico de abastecimentos."
                                iconName="looking"
                                />
                            )
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
                    activeOpacity={0.8}>
                    <FontAwesome6 name="plus" size={22} iconStyle='solid' color="#FFF" />
                </TouchableOpacity>
            )}

            <Footer />
        </SafeAreaView>
    );
}