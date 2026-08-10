import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { useFuelLogCard } from './useFuelLogCard';

import { FuelLog } from '@database/logService';

import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

import { styles } from './styles';

interface FuelLogCardProps {
    data: FuelLog;
    onPress?: () => void;
}

/**
 * Componente que exibe um cartão de registro de abastecimento.
 */
export function FuelLogCard({ data, onPress }: FuelLogCardProps) {
    const {
        colors,
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
            style={[styles.card, { backgroundColor: colors.surface }]}
            onPress={onPress}
            activeOpacity={0.7}>
            <View style={styles.header}>
                <View style={styles.left}>
                    <View style={[styles.icon, { backgroundColor: accentColor + 15 }]}>
                        <FontAwesome6 name="gas-pump" size={14} iconStyle="solid" color={accentColor} />
                    </View>
                    <Text style={[styles.fuel, { color: colors.textPrimary }]}>
                        {data.fuel_type}
                    </Text>
                </View>
                <Text style={[styles.date, { color: colors.textSecondary }]}>
                    {formattedDate}
                </Text>
            </View>

            <View style={styles.container}>
                <View style={styles.block}>
                    <Text style={[styles.label, { color: colors.textSecondary }]}>Total</Text>
                    <Text style={[styles.value, { color: colors.textPrimary }]}>R$ {formattedTotal}</Text>
                </View>
                <View style={[styles.divider, { backgroundColor: colors.border }]} />
                <View style={styles.block}>
                    <Text style={[styles.label, { color: colors.textSecondary }]}>Volume</Text>
                    <Text style={[styles.value, { color: colors.textPrimary }]}>{formattedLiters} L</Text>
                </View>
                <View style={[styles.divider, { backgroundColor: colors.border }]} />
                <View style={styles.block}>
                    <Text style={[styles.label, { color: colors.textSecondary }]}>Preço/L</Text>
                    <Text style={[styles.value, { color: colors.textPrimary }]}>R$ {formattedPrice}</Text>
                </View>
            </View>

            <View style={[styles.footer]}>
                <View style={styles.odometer}>
                    <View style={styles.row}>
                        <FontAwesome6 name="gauge-high" size={12} iconStyle="solid" color={colors.textSecondary} style={{ marginRight: 6 }} />
                        <Text style={[styles.text, { color: colors.textSecondary, fontSize: 13, fontWeight: 'bold' }]}>
                            {formattedOdometer} km
                        </Text>
                    </View>
                    {formattedDistance && (
                        <Text style={[styles.distance, { color: colors.textSecondary }]}>
                            {formattedDistance}
                        </Text>
                    )}
                </View>

                <View style={styles.right}>

                    {formattedCostPerKm && (
                        <View style={[styles.badge, { backgroundColor: colors.surface }]}>
                            <Text style={[styles.badge, { color: colors.textSecondary }]}>{formattedCostPerKm}</Text>
                        </View>
                    )}

                    {formattedKml && (
                        <View style={[styles.badge, { backgroundColor: accentColor + '15' }]}>
                            <FontAwesome6 name="gas-pump" size={11} iconStyle="solid" color={accentColor} style={{ marginRight: 4 }} />
                            <Text style={[styles.text, { color: accentColor }]}>{formattedKml}</Text>
                        </View>
                    )}

                    {data.is_full === 1 && (
                        <View style={[styles.badge, { backgroundColor: accentColor + '15' }]}>
                            <FontAwesome6 name="droplet" size={11} iconStyle="solid" color={accentColor} style={{ marginRight: 4 }} />
                            <Text style={[styles.text, { color: accentColor }]}>Cheio</Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
}