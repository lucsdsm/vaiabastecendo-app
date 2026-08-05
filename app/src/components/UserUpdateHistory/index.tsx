import React from 'react';
import { FlatList, Text, View } from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

import LoadingState from '../LoadingState';
import EmptyState from '../EmptyState';

import { getReadableColor } from '../../utils/color';

import { useAppTheme } from '../../theme/ThemeProvider';
import { styles } from './styles';
import {
  UserUpdateHistoryItem,
  useUserUpdateHistory,
} from './useUserUpdateHistory';

interface UserUpdateHistoryProps {
  userId?: number | null;
}

/**
 * Exibe o histórico recente de atualizações de preço realizadas pelo usuário
 * em formato cronológico, com visual limpo e leitura rápida.
 */
export default function UserUpdateHistory({ userId }: UserUpdateHistoryProps) {
  const { colors, isDark } = useAppTheme();
  const { updates, loading, summary, formatPrice, formatDate, getFuelAccent } =
    useUserUpdateHistory({ enabled: true });

  const header = (
    <View style={styles.header}>
      <Text style={[styles.eyebrow, { color: colors.textPrimary }]}>
        Últimas 10 contribuições
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        {header}
        <View style={styles.loadingContent}>
          <LoadingState message='Carregando histórico...' iconName='history' />
        </View>
      </View>
    );
  }

  if (!updates.length) {
    return (
      <View style={styles.container}>
        {header}
        <View style={styles.loadingContent}>
          <EmptyState title="Você ainda não tem um histórico de atualizações." message='Suas próximas contribuições aparecerão aqui com data, preço e posto.' iconName='fail' />
        </View>
      </View>
    );
  }

  function renderItem({
    item,
    index,
  }: {
    item: UserUpdateHistoryItem;
    index: number;
  }) {
    const accentColor = getReadableColor(item.color, isDark);
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
            <View style={[styles.timelineLine, {backgroundColor: colors.textSecondary + '40'}]}/>
          ) : null}
        </View>

        <View
          style={[styles.itemCard, {backgroundColor: colors.surface}]}>
          <View style={styles.itemTopRow}>
            <View style={styles.itemTitleBlock}>
              <Text style={[styles.stationName, { color: colors.textPrimary }]}>
                {item.station_name}
              </Text>

              <View style={styles.metaRow}>
                <Text style={[styles.fuelType, { color: accentColor }]}>
                  {item.fuel_type}
                </Text>
              </View>
            </View>

            <View style={styles.priceBlock}>
              <Text style={[styles.priceValue, { color: colors.textPrimary }]}>
                {formatPrice(item.price)}
              </Text>
            </View>
          </View>

          <View style={styles.itemFooter}>
            <View style={styles.footerLeft}>
              <FontAwesome6 name="clock" size={12} iconStyle='solid' color={colors.textSecondary} />
              <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                {formatDate(item.created_at)}
              </Text>
            </View>

            <View style={styles.footerRight}>
              <FontAwesome6 name="thumbs-up" size={12} iconStyle='solid' color={colors.textSecondary} />
              <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                {item.likes}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View
      style={styles.container}>
      {header}

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