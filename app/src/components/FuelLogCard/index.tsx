import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { styles } from './styles';
import { useFuelLogCard } from './useFuelLogCard';
import { FuelLog } from '../../database/logService';

interface FuelLogCardProps {
    data: FuelLog;
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
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <View style={[
                        styles.iconContainer,
                        { backgroundColor: accentColor + (isDark ? '22' : '14') }
                    ]}>
                        <FontAwesome6 name="gas-pump" size={14} iconStyle="solid" color={accentColor} />
                    </View>
                    <Text style={[styles.fuelType, { color: colors.textPrimary }]}>
                        {data.fuel_type}
                    </Text>
                </View>
                <Text style={[styles.dateText, { color: colors.textSecondary }]}>
                    {formattedDate}
                </Text>
            </View>

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

            <View style={[styles.footer, { borderTopColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)' }]}>

                <View style={styles.odometerContainer}>
                    <View style={styles.odometerRow}>
                        <FontAwesome6 name="gauge-high" size={12} iconStyle="solid" color={colors.textSecondary} style={{ marginRight: 6 }} />
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

                <View style={styles.footerRightGroup}>

                    {formattedCostPerKm && (
                        <View style={[styles.badge, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }]}>
                            <FontAwesome6 name="dollar-sign" size={11} iconStyle="solid" color={colors.textSecondary} style={{ marginRight: 2 }} />
                            <Text style={[styles.badgeText, { color: colors.textSecondary }]}>{formattedCostPerKm}</Text>
                        </View>
                    )}

                    {formattedKml && (
                        <View style={[styles.badge, { backgroundColor: accentColor + '15' }]}>
                            <FontAwesome6 name="gas-pump" size={11} iconStyle="solid" color={accentColor} style={{ marginRight: 4 }} />
                            <Text style={[styles.badgeText, { color: accentColor }]}>{formattedKml}</Text>
                        </View>
                    )}

                    {data.is_full === 1 && (
                        <View style={[styles.badge, { backgroundColor: accentColor + '15' }]}>
                            <FontAwesome6 name="droplet" size={11} iconStyle="solid" color={accentColor} style={{ marginRight: 4 }} />
                            <Text style={[styles.badgeText, { color: accentColor }]}>Cheio</Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
}