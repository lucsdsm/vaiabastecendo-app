import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';

import { useAppTheme } from '../../theme/ThemeProvider';
import { styles } from './styles';
import {
  UserUpdatesHistoryItem,
  useUserUpdatesHistory,
} from './useUserUpdatesHistory';

interface UserUpdatesHistoryProps {
  userId?: number | null;
}

/**
 * Exibe o histórico recente de atualizações de preço realizadas pelo usuário
 * em formato cronológico, com visual limpo e leitura rápida.
 */
export default function UserUpdatesHistory({ userId }: UserUpdatesHistoryProps) {
  const { colors, isDark } = useAppTheme();

  const {
    updates,
    loading,
    summary,
    formatPrice,
    formatDate,
    getFuelAccent,
  } = useUserUpdatesHistory({ userId });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  if (!updates.length) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: isDark
              ? 'rgba(255,255,255,0.03)'
              : 'rgba(0,0,0,0.02)',
            borderColor: isDark
              ? 'rgba(255,255,255,0.08)'
              : 'rgba(0,0,0,0.06)',
          },
        ]}
      >
        <View style={styles.header}>
          <Text style={[styles.eyebrow, { color: colors.textSecondary }]}>
            Histórico de atualizações
          </Text>
          <Text style={[styles.title, { color: colors.textPrimary }]}>
            Sua atividade
          </Text>
        </View>

        <View
          style={[
            styles.emptyState,
            {
              backgroundColor: colors.primary + (isDark ? '12' : '08'),
              borderColor: colors.primary + '26',
            },
          ]}
        >
          <View
            style={[
              styles.emptyIconContainer,
              { backgroundColor: colors.primary + '18' },
            ]}
          >
            <Feather name="clock" size={16} color={colors.primary} />
          </View>

          <View style={styles.emptyTextContainer}>
            <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>
              Nenhuma atualização ainda
            </Text>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              Suas próximas contribuições aparecerão aqui com data, preço e posto.
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function renderItem({
    item,
    index,
  }: {
    item: UserUpdatesHistoryItem;
    index: number;
  }) {
    const accentColor = getFuelAccent(item.fuel_type);
    const isLast = index === updates.length - 1;

    return (
      <View style={styles.timelineRow}>
        <View style={styles.timelineColumn}>
          <View
            style={[
              styles.timelineDot,
              { backgroundColor: accentColor, borderColor: colors.surface },
            ]}
          />
          {!isLast ? (
            <View
              style={[
                styles.timelineLine,
                {
                  backgroundColor: isDark
                    ? 'rgba(255,255,255,0.08)'
                    : 'rgba(0,0,0,0.06)',
                },
              ]}
            />
          ) : null}
        </View>

        <View
          style={[
            styles.itemCard,
            {
              backgroundColor: isDark
                ? 'rgba(255,255,255,0.03)'
                : 'rgba(0,0,0,0.018)',
              borderColor: isDark
                ? 'rgba(255,255,255,0.07)'
                : 'rgba(0,0,0,0.05)',
            },
          ]}
        >
          <View style={styles.itemTopRow}>
            <View style={styles.itemTitleBlock}>
              <Text style={[styles.stationName, { color: colors.textPrimary }]}>
                {item.station_name}
              </Text>

              <View style={styles.metaRow}>
                <Text style={[styles.fuelType, { color: accentColor }]}>
                  {item.fuel_type}
                </Text>

                {item.station_brand ? (
                  <Text style={[styles.metaDivider, { color: colors.textSecondary }]}>
                    •
                  </Text>
                ) : null}

                {item.station_brand ? (
                  <Text style={[styles.brandText, { color: colors.textSecondary }]}>
                    {item.station_brand}
                  </Text>
                ) : null}
              </View>
            </View>

            <View style={styles.priceBlock}>
              <Text style={[styles.priceLabel, { color: colors.textSecondary }]}>
                Preço
              </Text>
              <Text style={[styles.priceValue, { color: colors.textPrimary }]}>
                {formatPrice(item.price)}
              </Text>
            </View>
          </View>

          <View style={styles.itemFooter}>
            <View style={styles.footerLeft}>
              <Feather name="clock" size={12} color={colors.textSecondary} />
              <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                {formatDate(item.created_at)}
              </Text>
            </View>

            <View style={styles.footerRight}>
              <Feather name="thumbs-up" size={12} color={colors.textSecondary} />
              <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                {item.likes}
              </Text>

              {item.verified ? (
                <MaterialIcons
                  name="verified"
                  size={14}
                  color={colors.primary}
                  style={{ marginLeft: 8 }}
                />
              ) : null}
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark
            ? 'rgba(255,255,255,0.03)'
            : 'rgba(0,0,0,0.02)',
          borderColor: isDark
            ? 'rgba(255,255,255,0.08)'
            : 'rgba(0,0,0,0.06)',
        },
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.eyebrow, { color: colors.textSecondary }]}>
          Histórico de atualizações
        </Text>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          Sua atividade
        </Text>
      </View>

      <View style={styles.summaryRow}>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
            Total
          </Text>
          <Text style={[styles.summaryValue, { color: colors.textPrimary }]}>
            {summary.totalUpdates}
          </Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
            Último preço
          </Text>
          <Text style={[styles.summaryValue, { color: colors.textPrimary }]}>
            {summary.lastPrice ? formatPrice(summary.lastPrice) : '—'}
          </Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
            Curtidas
          </Text>
          <Text style={[styles.summaryValue, { color: colors.textPrimary }]}>
            {summary.totalLikes}
          </Text>
        </View>
      </View>

      <FlatList
        data={updates}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        scrollEnabled={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </View>
  );
}