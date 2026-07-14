import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { styles } from './styles';
import { useFuelLogCard } from './useFuelLogCard';

interface FuelLogCardProps {
    data: any;
    onPress?: () => void;
}

export function FuelLogCard({ data, onPress }: FuelLogCardProps) {
    const {
        colors,
        isDark,
        accentColor,
        formattedDate,
        formattedTotal,
        formattedLiters,
        formattedPrice,
        formattedOdometer,
        formattedKml,
        formattedDistance,
        formattedCostPerKm
    } = useFuelLogCard(data);

    return (
        <TouchableOpacity 
            style={[styles.card, { backgroundColor: colors.surface, borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            {/* Cabeçalho do Card */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    {/* 👇 Cor Dinâmica Aplicada Aqui */}
                    <View style={[
                        styles.iconContainer, 
                        { backgroundColor: accentColor + (isDark ? '22' : '14') }
                    ]}>
                        <FontAwesome5 name="gas-pump" size={14} color={accentColor} />
                    </View>
                    <Text style={[styles.fuelType, { color: colors.textPrimary }]}>
                        {data.fuel_type}
                    </Text>
                </View>
                <Text style={[styles.dateText, { color: colors.textSecondary }]}>
                    {formattedDate}
                </Text>
            </View>

            {/* Grid de Valores */}
            <View style={styles.metricsContainer}>
                <View style={styles.metricBlock}>
                    <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Total</Text>
                    <Text style={[styles.metricValue, { color: colors.textPrimary }]}>R$ {formattedTotal}</Text>
                </View>
                <View style={[styles.metricDivider, { backgroundColor: colors.border }]} />
                <View style={styles.metricBlock}>
                    <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Volume</Text>
                    <Text style={[styles.metricValue, { color: colors.textPrimary }]}>{formattedLiters} L</Text>
                </View>
                <View style={[styles.metricDivider, { backgroundColor: colors.border }]} />
                <View style={styles.metricBlock}>
                    <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Preço/L</Text>
                    <Text style={[styles.metricValue, { color: colors.textPrimary }]}>R$ {formattedPrice}</Text>
                </View>
            </View>

            {/* Rodapé: Odômetro/Distância, badges de eficiência */}
                <View style={[styles.footer, { borderTopColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)' }]}>
                    
                    {/* Informações de Quilometragem */}
                    <View style={styles.odometerContainer}>
                        <View style={styles.odometerRow}>
                            <FontAwesome5 name="tachometer-alt" size={12} color={colors.textSecondary} style={{ marginRight: 6 }}/>
                            <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                                {formattedOdometer} km
                            </Text>
                        </View>
                        {formattedDistance && (
                            <Text style={[styles.distanceText, { color: colors.textSecondary }]}>
                                {formattedDistance}
                            </Text>
                        )}
                    </View>

                    {/* Grupo de Badges */}
                    <View style={styles.footerRightGroup}>
                        
                        {/* Custo por Km */}
                        {formattedCostPerKm && (
                            <View style={[styles.badge, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }]}>
                                <Feather name="dollar-sign" size={11} color={colors.textSecondary} style={{ marginRight: 2 }} />
                                <Text style={[styles.badgeText, { color: colors.textSecondary }]}>{formattedCostPerKm}</Text>
                            </View>
                        )}

                        {/* Consumo Real (km/l) */}
                        {formattedKml && (
                            <View style={[styles.badge, { backgroundColor: accentColor + '15'}]}>
                                <Feather name="target" size={11} color={accentColor} style={{ marginRight: 4 }} />
                                <Text style={[styles.badgeText, { color: accentColor }]}>{formattedKml}</Text>
                            </View>
                        )}

                        {/* Tanque Cheio */}
                        {data.is_full === 1 && (
                            <View style={[styles.badge, { backgroundColor: accentColor + '15' }]}>
                                <Feather name="droplet" size={11} color={accentColor} style={{ marginRight: 4 }} />
                                <Text style={[styles.badgeText, { color: accentColor }]}>Cheio</Text>
                            </View>
                        )}
                    </View>
                </View>
        </TouchableOpacity>
    );
}