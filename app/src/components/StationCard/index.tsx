import React from 'react';
import { Image, ScrollView, StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { CurrentPrice, StationCardProps, useStationCard } from './useStationCard';

import { formatarTempoDecorrido } from '@utils/dateFormatter';
import { flagsDictionary } from '@utils/flagsDictionary';
import { getReadableColor } from '@utils/color';
import { getBadgeInfo } from '@utils/badgeRules';

import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

import { styles } from './styles';

export type { CurrentPrice, StationCardProps } from './useStationCard';

interface LocalBadgeProps {
  label: string;
  color: string;
  textColor?: string;
  icon?: React.ReactNode;
}

function LocalBadge({ label, color, textColor = '#111111', icon }: LocalBadgeProps) {
  return (
    <View style={[styles.badge, { backgroundColor: color }]}>
      <View style={styles.content}>
        {icon ? <View style={styles.icon}>{icon}</View> : null}
        <Text style={[styles.text, { color: textColor }]}>{label}</Text>
      </View>
    </View>
  );
}

interface LocalCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

function LocalCard({ children, style }: LocalCardProps) {
  return <View style={[styles.base, style]}>{children}</View>;
}

/**
 * Card para exibição de posto de combustível.
 * Mostra preços, localização, likes e informações de atualização.
 */
export default function StationCard({
  data,
  onRefresh,
}: {
  data: StationCardProps;
  onRefresh: () => void;
}) {
  const {
    colors,
    isDark,
    localPrices,
    rating,
    handleGetDirections,
    toggleLike,
    handleOpenUpdateModal,
  } = useStationCard(data, onRefresh);

  const logoSource = flagsDictionary[data.brand];
  const hasPrices = localPrices.length > 0;
  const badge = getBadgeInfo(data.lastUpdatedBy.likes_received ?? 0);

  return (
    <LocalCard style={[styles.card, { backgroundColor: colors.surface }]}>
      <TouchableOpacity activeOpacity={0.7} onPress={handleOpenUpdateModal}>
        <View style={styles.header}>
          <View style={styles.left}>
            <Text style={[styles.title, { color: colors.textPrimary }]} numberOfLines={1}>
              {data.name}
            </Text>

            <View style={styles.row}>
              {rating !== undefined && rating !== null && (
                <View style={styles.inline}>
                  <FontAwesome6 name="star" size={10} color="#FFB300" iconStyle='solid' />
                  <Text style={[styles.rating, { color: colors.textPrimary }]}>
                    {rating.toFixed(1)}
                  </Text>
                </View>
              )}

              <LocalBadge
                label={data.distance}
                color={colors.primary + (isDark ? '22' : '12')}
                textColor={colors.primary}
                icon={<FontAwesome6 name="compass" size={10} color={colors.primary} iconStyle='solid' />}
              />
            </View>

          </View>

          <View style={styles.right}>
            <View style={styles.container}>
              {logoSource ? <Image source={logoSource} style={styles.image} /> : null}
            </View>

            <TouchableOpacity
              style={[
                styles.direction,
                {
                  backgroundColor: colors.primary + (isDark ? '14' : '0D'),
                  borderColor: colors.primary + '40',
                },
              ]}
              onPress={handleGetDirections}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Abrir direções no mapa"
            >
              <FontAwesome6 name="location-arrow" size={18} color={colors.primary} iconStyle='solid' />
            </TouchableOpacity>
          </View>

        </View>

        <View style={[styles.row, { marginBottom: 8 }]}>
          <Text
            style={[styles.address, { color: colors.textSecondary }]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {data.address}
          </Text>
        </View>
      </TouchableOpacity>

      {hasPrices ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scroll}>
          {localPrices.map((item: CurrentPrice, index: number) => {
            const accentColor = getReadableColor(item.color, isDark);

            return (
              <View
                key={index}
                style={[
                  styles.block,
                  styles.emblem, { backgroundColor: accentColor + (isDark ? '1A' : '0A') }]}>
                <View style={styles.heading}>
                  <View style={styles.fuel}>
                    <Text
                      style={[styles.label, { color: accentColor }]}
                      numberOfLines={2}>
                      {item.fuelType.replace(' ', '\n')}
                    </Text>
                  </View>
                </View>

                <View>
                  <Text
                    style={[styles.value, { color: accentColor }]}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.9}>
                    R$ {item.price.toFixed(2)}
                  </Text>
                </View>

                <TouchableOpacity
                  style={[
                    styles.like,
                    {
                      backgroundColor: item.isLiked
                        ? colors.danger + '15'
                        : isDark
                          ? 'rgba(255,255,255,0.08)'
                          : 'rgba(0,0,0,0.04)',
                    },
                  ]}
                  onPress={() => toggleLike(item.id)}
                  activeOpacity={0.7}
                  accessibilityRole="button"
                  accessibilityLabel={`Curtir preço de ${item.fuelType}`}
                >
                  <FontAwesome6
                    name={item.isLiked ? 'heart' : 'thumbs-up'}
                    size={14}
                    color={item.isLiked ? colors.danger : colors.textSecondary}
                  />
                  <Text
                    style={[
                      styles.count, { color: item.isLiked ? colors.danger : colors.textSecondary }]}>
                    {item.likes}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <TouchableOpacity activeOpacity={0.7} onPress={handleOpenUpdateModal}>
          <View
            style={[
              styles.noprice,
              {
                backgroundColor: colors.primary + (isDark ? '15' : '08'),
                borderColor: colors.primary + '30',
              },
            ]}
          >
            <View
              style={[
                styles.hero,
                { backgroundColor: colors.primary + '20' },
              ]}
            >
              <FontAwesome6 name="plus" size={20} color={colors.primary} iconStyle='solid' />
            </View>
            <View style={styles.words}>
              <Text style={[styles.caption, { color: colors.textPrimary }]}>
                Sem preços cadastrados.
              </Text>
              <Text style={[styles.message, { color: colors.textSecondary }]}>
                Clique aqui e informe os preços!
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}

      {hasPrices && data.lastUpdatedBy?.name ? (
        <TouchableOpacity activeOpacity={0.7} onPress={handleOpenUpdateModal}>
          <View
            style={[
              styles.info,
              {
                borderTopColor: isDark
                  ? 'rgba(255,255,255,0.06)'
                  : 'rgba(0,0,0,0.04)',
              },
            ]}
          >
            <FontAwesome6
              name="user"
              size={12}
              color={colors.textSecondary}
              style={[{ marginRight: 4 }]}
            />
            <Text style={[styles.text, { color: colors.textSecondary }]}>
              Atualizado {formatarTempoDecorrido(data.lastUpdatedAt)}por{' '}
            </Text>

            <View style={[styles.row, { gap: 0 }]}>
              <Text style={[styles.text, { color: colors.textPrimary }]}>
                {data.lastUpdatedBy.name}
              </Text>

              {badge.tier !== 'none' ? (
                <View style={[{ marginLeft: 4, justifyContent: 'center', alignItems: 'center' }]}>
                  <FontAwesome6
                    size={12}
                    name={getBadgeInfo(data.lastUpdatedBy.likes_received ?? 0).iconName}
                    color={getBadgeInfo(data.lastUpdatedBy.likes_received ?? 0).ringColor}
                    iconStyle='solid'
                  />
                </View>
              ) : null}
            </View>
          </View>
        </TouchableOpacity>
      ) : null}
    </LocalCard>
  );
}