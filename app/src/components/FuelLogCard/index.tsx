import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { styles } from './styles';
import { FuelLog } from '../../database/logService';
import { useFuelLogCard } from './useFuelLogCard';

interface FuelLogCardProps {
    data: FuelLog;
    onPress?: () => void;
}

export function FuelLogCard({ data, onPress }: FuelLogCardProps) {
    const {
        colors,
        isDark,
        formattedDate,
        formattedTotal,
        formattedLiters,
        formattedPrice,
        formattedOdometer,
        formattedKml
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
                    <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
                        <FontAwesome5 name="gas-pump" size={14} color={colors.primary} />
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
                    <Text style={[styles.metricValue, { color: colors.textPrimary }]}>
                        R$ {formattedTotal}
                    </Text>
                </View>

                <View style={[styles.metricDivider, { backgroundColor: colors.border }]} />

                <View style={styles.metricBlock}>
                    <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Volume</Text>
                    <Text style={[styles.metricValue, { color: colors.textPrimary }]}>
                        {formattedLiters} L
                    </Text>
                </View>

                <View style={[styles.metricDivider, { backgroundColor: colors.border }]} />

                <View style={styles.metricBlock}>
                    <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Preço/L</Text>
                    <Text style={[styles.metricValue, { color: colors.textPrimary }]}>
                        R$ {formattedPrice}
                    </Text>
                </View>
            </View>

            {/* Rodapé: Odômetro na Esquerda | Média e Tanque Cheio na Direita */}
            <View style={[styles.footer, { borderTopColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)' }]}>
                
                {/* Odômetro */}
                <View style={styles.odometerRow}>
                    <FontAwesome5 name="tachometer-alt" size={12} color={colors.textSecondary} style={{ marginRight: 6 }}/>
                    <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                        {formattedOdometer} km
                    </Text>
                </View>

                {/* Grupo de Badges */}
                <View style={styles.footerRightGroup}>
                    {formattedKml && (
                        <View style={[styles.badge, { backgroundColor: colors.primary + '15'}]}>
                            <Feather name="target" size={12} color={colors.primary} style={{ marginRight: 4 }} />
                            <Text style={[styles.badgeText, { color: colors.primary }]}>{formattedKml}</Text>
                        </View>
                    )}

                    {data.is_full === 1 && (
                        <View style={[styles.badge, { backgroundColor: colors.primary + '15' }]}>
                            <Feather name="droplet" size={12} color={colors.primary} style={{ marginRight: 4 }} />
                            <Text style={[styles.badgeText, { color: colors.primary }]}>Tanque Cheio</Text>
                        </View>
                    )}
                </View>

            </View>
        </TouchableOpacity>
    );
}