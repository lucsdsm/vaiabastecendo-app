import React from 'react';
import { FlatList, Text, View } from 'react-native';

import { UserUpdateHistoryItem, useUserUpdateHistory } from './useUserUpdateHistory';

import LoadingState from '../LoadingState';
import EmptyState from '../EmptyState';

import { getReadableColor } from '@utils/color';

import { useAppTheme } from '@theme/ThemeProvider';

import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

import { styles } from './styles';


interface UserUpdateHistoryProps {
  userId?: number | null;
}

/**
 * Exibe o histórico recente de atualizações de preço realizadas pelo usuário
 * em formato cronológico, com visual limpo e leitura rápida.
 */
export default function UserUpdateHistory({ userId }: UserUpdateHistoryProps) {
  const { colors, isDark } = useAppTheme();
  const { updates, loading, formatPrice, formatDate } =
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
        <LoadingState message='Carregando histórico...' iconName='history' />
      </View>
    );
  }

  if (!updates.length) {
    return (
      <View style={styles.container}>
        {header}
        <EmptyState title="Você ainda não tem um histórico de atualizações." message='Suas próximas contribuições aparecerão aqui com data, preço e posto.' iconName='fail' />
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
      <View style={styles.row}>
        <View style={styles.column}>
          <View
            style={[
              styles.dot,
              { backgroundColor: accentColor, borderColor: colors.surface },
            ]}
          />
          {!isLast ? (
            <View style={[styles.line, {backgroundColor: colors.textSecondary + '40'}]}/>
          ) : null}
        </View>

        <View
          style={[styles.item, {backgroundColor: colors.surface}]}>
          <View style={styles.top}>
            <View style={styles.title}>
              <Text style={[styles.name, { color: colors.textPrimary }]}>
                {item.station_name}
              </Text>

              <View style={styles.meta}>
                <Text style={[styles.fuel, { color: accentColor }]}>
                  {item.fuel_type}
                </Text>
              </View>
            </View>

            <View style={styles.block}>
              <Text style={[styles.value, { color: colors.textPrimary }]}>
                {formatPrice(item.price)}
              </Text>
            </View>
          </View>

          <View style={styles.footer}>
            <View style={styles.left}>
              <FontAwesome6 name="clock" size={12} iconStyle='solid' color={colors.textSecondary} />
              <Text style={[styles.text, { color: colors.textSecondary }]}>
                {formatDate(item.created_at)}
              </Text>
            </View>

            <View style={styles.right}>
              <FontAwesome6 name="thumbs-up" size={12} iconStyle='solid' color={colors.textSecondary} />
              <Text style={[styles.text, { color: colors.textSecondary }]}>
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
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </View>
  );
}