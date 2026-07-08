import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, ActivityIndicator, Dimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { useAppTheme } from '../../theme/ThemeProvider';
import { styles } from './styles';
import { useHistoricoPosto } from '../../hooks/useHistoricoPosto';

interface HistoryItem {
    id: number;
    tipo_combustivel: string;
    preco: number;
    data_hora: string;
    autor: string;
}

interface PriceHistoryTableProps {
    postoId: string;
    selectedFuelName: string | null;
}

export default function PriceHistoryTable({ postoId, selectedFuelName }: PriceHistoryTableProps) {
    const { colors } = useAppTheme();
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [loading, setLoading] = useState(true);

    const { getHistorico } = useHistoricoPosto();

    useEffect(() => {
        async function fetchHistory() {
            try {
                const data = await getHistorico(postoId);
                setHistory(data);
            } catch (error) {
                console.error("Erro ao buscar histórico:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchHistory();
    }, [postoId, getHistorico]);

    const chartData = useMemo(() => {
        if (!selectedFuelName) return [];

        const filteredHistory = history.filter(item => item.tipo_combustivel === selectedFuelName).reverse();

        return filteredHistory.map(item => {
            const date = new Date(item.data_hora);
            return {
                value: Number(item.preco),
                label: `${date.getDate()}/${date.getMonth() + 1}`,
                dataPointText: Number(item.preco).toFixed(2).replace('.', ','),
                textColor: colors.textPrimary,
                textShiftY: -15, 
                textShiftX: -12,
            };
        });
    }, [history, selectedFuelName]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator color={colors.primary} />
            </View>
        );
    }

    if (chartData.length === 0) {
        return (
            null
        );
    }

    const screenWidth = Dimensions.get('window').width;
    const maxPrice = chartData.length > 0 ? Math.max(...chartData.map(d => d.value)) : 0;
    const chartMaxValue = maxPrice + (maxPrice * 0.15); 

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.textPrimary }]}>Histórico de preços</Text>
            
            <View style={styles.chartWrapper}>
                {chartData.length > 0 ? (
                    <LineChart
                        data={chartData}
                        width={screenWidth - 80}
                        height={180} 
                        maxValue={chartMaxValue}
                        thickness={3}
                        color={colors.primary}
                        dataPointsColor={colors.primary} 
                        focusedDataPointColor={colors.primary} 
                        dataPointsRadius={4}
                        noOfSections={4}
                        yAxisLabelPrefix="R$ "
                        formatYLabel={(label) => Number(label).toFixed(2).replace('.', ',')}
                        yAxisTextStyle={{ color: colors.textSecondary, fontSize: 10 }}
                        xAxisLabelTextStyle={{ color: colors.textSecondary, fontSize: 10, marginBottom: 4 }}
                        hideRules
                        yAxisColor="transparent"
                        xAxisColor="transparent"
                        curved
                        isAnimated
                        animationDuration={1200}
                        startFillColor={colors.primary}
                        startOpacity={0.2}
                        endFillColor={colors.primary}
                        endOpacity={0.01}
                        initialSpacing={35} 
                        endSpacing={35}     
                        
                    
                    />
                ) : (
                    null
                )}
            </View>
        </View>
    );
}