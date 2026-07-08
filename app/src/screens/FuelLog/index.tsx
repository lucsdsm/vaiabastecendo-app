import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../../theme/ThemeProvider';
import  { styles } from './styles';

export default function GarageScreen() {
    const { colors } = useAppTheme();
    const navigation = useNavigation();

    // Função de exemplo para o botão da direita
    const handleAddVehicle = () => {
        // Lógica para abrir modal ou tela de novo veículo
        console.log("Abrir modal de novo veículo");
    };

    return (
        <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: colors.background }]}>
            
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerActionButton}>
                    <Feather name="arrow-left" size={24} color={colors.textPrimary} />
                </TouchableOpacity>
                
                <View style={styles.headerTitleContainer}>
                    <Text
                        style={[styles.headerTitle, { color: colors.textPrimary }]}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        Garagem
                    </Text>
                </View>

                {/* Botão da direita adaptado para adicionar veículo */}
                <TouchableOpacity onPress={handleAddVehicle} style={styles.headerActionButton}>
                    <Feather name="plus" size={24} color={colors.primary} />
                </TouchableOpacity>
            </View>
            {/* FIM DO HEADER PADRONIZADO */}

            {/* Restante do conteúdo da tela (Timeline, etc) */}
            <View style={styles.content}>
                {/* ... */}
            </View>

        </SafeAreaView>
    );
}