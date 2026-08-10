import React, { useEffect, useMemo, useState } from 'react';
import { Dimensions, View } from 'react-native';

import { useStationHistory } from '@hooks/useStationHistory';

import { useAppTheme } from '@theme/ThemeProvider';

import { styles } from './styles';

export interface HistoryItem {
  id: number;
  fuel_type: string;
  price: number;
  created_at: string;
  author: string;
}

export interface PriceHistoryTableProps {
  stationId: string;
  selectedFuelName: string | null;
}

export interface PriceHistoryChartPoint {
  value: number;
  label: string;
  customDataPoint: () => React.ReactElement;
}

export interface PriceHistorySummary {
  latestPrice: number;
  records: number;
  latestAuthor: string;
  latestDate: Date;
  delta: number;
  trend: 'up' | 'down' | 'flat';
  latestItems: HistoryItem[];
}

export interface PriceHistoryTableResult {
  colors: ReturnType<typeof useAppTheme>['colors'];
  isDark: boolean;
  loading: boolean;
  selectedFuelName: string | null;
  chartData: PriceHistoryChartPoint[];
  summary: PriceHistorySummary | null;
  screenWidth: number;
  chartMaxValue: number;
  chartMinValue: number;
  trendColor: string;
  trendLabel: string;
  formatPrice: (value: number) => string;
  formatDate: (date: Date) => string;
  chartShouldHideDataPoints: boolean;
}

/**
 * Centraliza carregamento, filtragem e formatação dos dados do histórico de preços.
 * O componente visual fica apenas responsável por renderizar o resultado.
 */
export function usePriceHistoryTable({
  stationId,
  selectedFuelName,
}: PriceHistoryTableProps): PriceHistoryTableResult {
  const { colors, isDark } = useAppTheme();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const { getStationHistory } = useStationHistory();

  useEffect(() => {
    if (!stationId) {
      setHistory([]);
      setLoading(false);
      return;
    }

    let isMounted = true;

    async function fetchHistory() {
      try {
        setLoading(true);
        const data = await getStationHistory(stationId);

        if (isMounted) {
          setHistory(data);
        }
      } catch (error) {
        console.error('Erro ao buscar histórico:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchHistory();

    return () => {
      isMounted = false;
    };
  }, [stationId, getStationHistory]);

  const chart_itens_limit = 12;

  const filteredHistory = useMemo(() => {
    if (!selectedFuelName) {
      return [];
    }

    return history
      .filter((item) => item.fuel_type === selectedFuelName)
      .sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      )
      .slice(chart_itens_limit * -1);
  }, [history, selectedFuelName]);

  const chartData = useMemo<PriceHistoryChartPoint[]>(() => {
    return filteredHistory.map((item) => {
      const date = new Date(item.created_at);

      return {
        value: Number(item.price),
        label: `${String(date.getDate()).padStart(2, '0')}/${String(
          date.getMonth() + 1
        ).padStart(2, '0')}`,
        customDataPoint: () => (
          <View
            style={[
              styles.dataPoint,
              {
                backgroundColor: colors.background,
                borderColor: colors.primary,
              },
            ]}
          />
        ),
      };
    });
  }, [filteredHistory, colors.background, colors.primary]);

  const summary = useMemo<PriceHistorySummary | null>(() => {
    if (!filteredHistory.length) {
      return null;
    }

    const latest = filteredHistory[filteredHistory.length - 1];
    const first = filteredHistory[0];
    const delta = Number(latest.price) - Number(first.price);
    const trend = delta > 0 ? 'up' : delta < 0 ? 'down' : 'flat';

    return {
      latestPrice: Number(latest.price),
      records: filteredHistory.length,
      latestAuthor: latest.author,
      latestDate: new Date(latest.created_at),
      delta,
      trend,
      latestItems: [...filteredHistory].reverse().slice(0, 3),
    };
  }, [filteredHistory]);

  const screenWidth = Dimensions.get('window').width;
  const prices = chartData.map((item) => item.value);
  const maxPrice = prices.length ? Math.max(...prices) : 0;
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const chartMaxValue = maxPrice + maxPrice * 0.06;
  const chartMinValue = Math.max(0, minPrice - minPrice * 0.04);

  const trendColor =
    summary?.trend === 'up'
      ? colors.danger
      : summary?.trend === 'down'
      ? colors.primary
      : colors.textSecondary;

  const trendLabel =
    summary?.trend === 'up'
      ? 'Em alta'
      : summary?.trend === 'down'
      ? 'Em queda'
      : 'Estável';

  const formatPrice = (value: number) =>
    `R$ ${value.toFixed(2).replace('.', ',')}`;

  const formatDate = (date: Date) =>
    `${String(date.getDate()).padStart(2, '0')}/${String(
      date.getMonth() + 1
    ).padStart(2, '0')} às ${String(date.getHours()).padStart(2, '0')}:${String(
      date.getMinutes()
    ).padStart(2, '0')}`;

  return {
    colors,
    isDark,
    loading,
    selectedFuelName,
    chartData,
    summary,
    screenWidth,
    chartMaxValue,
    chartMinValue,
    trendColor,
    trendLabel,
    formatPrice,
    formatDate,
    chartShouldHideDataPoints: filteredHistory.length > 6,
  };
}