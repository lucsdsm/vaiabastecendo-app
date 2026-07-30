import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import {
  PriceHistoryTableProps,
  usePriceHistoryTable,
} from './usePriceHistoryTable';
import LoadingState from '../LoadingState';
import EmptyState from '@components/EmptyState';

export default function PriceHistoryTable({
  stationId,
  selectedFuelName,
}: PriceHistoryTableProps) {
  const {
    colors,
    isDark,
    loading,
    chartData,
    summary,
    selectedFuelName: fuelName,
    screenWidth,
    chartMaxValue,
    chartMinValue,
    trendColor,
    trendLabel,
    formatPrice,
    formatDate,
    chartShouldHideDataPoints,
  } = usePriceHistoryTable({ stationId, selectedFuelName });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingState message='Carregando histórico...' iconName='history' />
      </View>
    );
  }

  if (!fuelName || chartData.length === 0 || !summary) {
    return (
      <View style={[styles.loadingContainer, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
        <EmptyState 
          title="Histórico indisponível" 
          message='Nenhum dado de histórico disponível.' 
          iconName='fail' />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          borderWidth: 0,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.titleBlock}>
          <Text style={[styles.eyebrow, { color: colors.textSecondary }]}>
            Histórico de preços
          </Text>
          <Text style={[styles.fuelName, { color: colors.textPrimary }]}>
            {fuelName}
          </Text>
        </View>

        <View
          style={[
            styles.badge,
            {
              backgroundColor:
                summary.trend === 'flat'
                  ? colors.textSecondary + '12'
                  : trendColor + '12',
              borderColor:
                summary.trend === 'flat'
                  ? colors.textSecondary + '20'
                  : trendColor + '25',
            },
          ]}
        >
          <Text style={[styles.badgeText, { color: trendColor }]}>
            {trendLabel}
          </Text>
        </View>
      </View>

      <View style={styles.summaryRow}>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
            Último preço
          </Text>
          <Text style={[styles.summaryValue, { color: colors.textPrimary }]}>
            {formatPrice(summary.latestPrice)}
          </Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
            Registros
          </Text>
          <Text style={[styles.summaryValue, { color: colors.textPrimary }]}>
            {summary.records}
          </Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
            Variação
          </Text>
          <Text style={[styles.summaryValue, { color: trendColor }]}>
            {summary.delta > 0 ? '+' : ''}
            {summary.delta.toFixed(2).replace('.', ',')}
          </Text>
        </View>
      </View>

      <View style={styles.chartWrapper}>
        <LineChart
          data={chartData}
          width={screenWidth - 88}
          height={190}
          adjustToWidth
          areaChart
          curved
          isAnimated
          animationDuration={700}
          color={colors.primary}
          startFillColor={colors.primary}
          endFillColor={colors.success}
          startOpacity={0.14}
          endOpacity={0.015}
          thickness={3}
          hideRules={false}
          rulesColor={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}
          noOfSections={4}
          maxValue={chartMaxValue}
          mostNegativeValue={chartMinValue}
          yAxisTextStyle={{
            color: colors.textSecondary,
            fontSize: 10,
          }}
          xAxisLabelTextStyle={{
            color: colors.textSecondary,
            fontSize: 10,
            marginTop: 6,
          }}
          yAxisLabelPrefix="R$ "
          formatYLabel={(label) => Number(label).toFixed(2).replace('.', ',')}
          yAxisColor="transparent"
          xAxisColor="transparent"
          dataPointsColor={colors.primary}
          focusedDataPointColor={colors.primary}
          hideDataPoints={chartShouldHideDataPoints}
          initialSpacing={22}
          endSpacing={22}
          spacing={Math.max(42, (screenWidth - 148) / Math.max(chartData.length, 1))}
          pointerConfig={{
            pointerStripColor: colors.primary + '55',
            pointerStripWidth: 1,
            pointerColor: colors.primary,
            radius: 5,
            activatePointersOnLongPress: true,
            autoAdjustPointerLabelPosition: true,
            pointerLabelComponent: (items: any) => {
              const item = items?.[0];
              if (!item) return null;

              return (
                <View
                  style={[
                    styles.tooltip,
                    {
                      backgroundColor: colors.background,
                      borderColor: isDark
                        ? 'rgba(255,255,255,0.08)'
                        : 'rgba(0,0,0,0.06)',
                    },
                  ]}
                >
                  <Text style={[styles.tooltipPrice, { color: colors.textPrimary }]}>
                    {formatPrice(Number(item.value))}
                  </Text>
                  <Text style={[styles.tooltipLabel, { color: colors.textSecondary }]}>
                    {item.label}
                  </Text>
                </View>
              );
            },
          }}
        />
      </View>

      <View
        style={[
          styles.footer,
          {
            borderTopColor: isDark
              ? 'rgba(255,255,255,0.06)'
              : 'rgba(0,0,0,0.05)',
          },
        ]}
      >
        <View style={styles.footerHeader}>
          <Feather name="clock" size={14} color={colors.textSecondary} />
          <Text style={[styles.footerTitle, { color: colors.textSecondary }]}>
            Últimas atualizações
          </Text>
        </View>

        {summary.latestItems.map((item) => {
          const itemDate = new Date(item.created_at);

          return (
            <View
              key={item.id}
              style={[
                styles.historyRow,
                {
                  borderBottomColor: isDark
                    ? 'rgba(255,255,255,0.05)'
                    : 'rgba(0,0,0,0.04)',
                },
              ]}
            >
              <View style={styles.historyMeta}>
                <Text style={[styles.historyPrice, { color: colors.textPrimary }]}>
                  {formatPrice(Number(item.price))}
                </Text>
                <Text style={[styles.historyInfo, { color: colors.textSecondary }]}>
                  por {item.author}
                </Text>
              </View>

              <Text style={[styles.historyDate, { color: colors.textSecondary }]}>
                {formatDate(itemDate)}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}