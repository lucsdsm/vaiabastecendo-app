import React from 'react';
import {
  Image,
  ScrollView,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';

import { styles } from './styles';
import { CurrentPrice, StationCardProps, useStationCard } from './useStationCard';

import { formatarTempoDecorrido } from '../../utils/dateFormatter';
import { flagsDictionary } from '../../utils/flagsDictionary';
import { getReadableColor } from '../../utils/color';

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
      <View style={styles.badgeContent}>
        {icon ? <View style={styles.badgeIcon}>{icon}</View> : null}
        <Text style={[styles.badgeText, { color: textColor }]}>{label}</Text>
      </View>
    </View>
  );
}

interface LocalCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

function LocalCard({ children, style }: LocalCardProps) {
  return <View style={[styles.localCardBase, style]}>{children}</View>;
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

  return (
    <LocalCard
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
        },
      ]}
    >
      <TouchableOpacity activeOpacity={0.7} onPress={handleOpenUpdateModal}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text
              style={[styles.title, { color: colors.textPrimary }]}
              numberOfLines={1}
            >
              {data.name}
            </Text>

            <View style={styles.metaRow}>
              {rating !== undefined && rating !== null && (
                <View style={styles.ratingInlineRow}>
                  <FontAwesome name="star" size={12} color="#FFB300" />
                  <Text style={[styles.ratingText, { color: colors.textPrimary }]}>
                    {rating.toFixed(1)}
                  </Text>
                </View>
              )}

              <LocalBadge
                label={data.distance}
                color={colors.primary + (isDark ? '22' : '12')}
                textColor={colors.primary}
                icon={<Feather name="navigation" size={11} color={colors.primary} />}
              />
            </View>

            <View style={styles.addressRow}>
              <Text
                style={[styles.addressText, { color: colors.textSecondary }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {data.address}
              </Text>
            </View>
          </View>

          <View style={styles.headerRight}>
            <View style={styles.logoContainer}>
              {logoSource ? <Image source={logoSource} style={styles.logoImage} /> : null}
            </View>

            <TouchableOpacity
              style={[
                styles.directionsButton,
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
              <Feather name="map-pin" size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.priceContainer}>
        {hasPrices ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.pricesScrollContent}
          >
            {localPrices.map((item: CurrentPrice, index: number) => {
              const accentColor = getReadableColor(item.color, isDark);

              return (
                <View
                  key={index}
                  style={[
                    styles.priceBlock,
                    styles.priceBadge,
                    {
                      backgroundColor: accentColor + (isDark ? '1A' : '0A'),
                    },
                  ]}
                >
                  <View style={styles.priceBadgeHeader}>
                    <View style={styles.fuelLabelContainer}>
                      <Text
                        style={[styles.fuelLabel, { color: accentColor }]}
                        numberOfLines={2}
                      >
                        {item.fuelType.replace(' ', '\n')}
                      </Text>
                    </View>
                  </View>

                  <View>
                    <Text
                      style={[styles.priceValue, { color: accentColor }]}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      minimumFontScale={0.9}
                    >
                      R$ {item.price.toFixed(2)}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={[
                      styles.likeButton,
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
                    <Feather
                      name={item.isLiked ? 'heart' : 'thumbs-up'}
                      size={12}
                      color={item.isLiked ? colors.danger : colors.textSecondary}
                    />
                    <Text
                      style={[
                        styles.likeCount,
                        {
                          color: item.isLiked ? colors.danger : colors.textSecondary,
                        },
                      ]}
                    >
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
                styles.noPriceContainer,
                {
                  backgroundColor: colors.primary + (isDark ? '15' : '08'),
                  borderColor: colors.primary + '30',
                },
              ]}
            >
              <View
                style={[
                  styles.noPriceIconContainer,
                  { backgroundColor: colors.primary + '20' },
                ]}
              >
                <Feather name="plus" size={18} color={colors.primary} />
              </View>
              <View style={styles.noPriceTextContainer}>
                <Text style={[styles.noPriceTitle, { color: colors.textPrimary }]}>
                  Sem preços cadastrados
                </Text>
                <Text style={[styles.noPriceText, { color: colors.textSecondary }]}>
                  Seja o primeiro a informar os preços!
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>

      {hasPrices && data.lastUpdatedBy?.name ? (
        <TouchableOpacity activeOpacity={0.7} onPress={handleOpenUpdateModal}>
          <View
            style={[
              styles.updateInfo,
              {
                borderTopColor: isDark
                  ? 'rgba(255,255,255,0.06)'
                  : 'rgba(0,0,0,0.04)',
              },
            ]}
          >
            <Feather
              name="user"
              size={11}
              color={colors.textSecondary}
              style={styles.updateIcon}
            />
            <Text style={[styles.updateText, { color: colors.textSecondary }]}>
              Atualizado {formatarTempoDecorrido(data.lastUpdatedAt)}por{' '}
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[styles.authorText, { color: colors.textPrimary }]}>
                {data.lastUpdatedBy.name}
              </Text>

              {data.lastUpdatedBy.verified && (
                <MaterialIcons
                  name="verified"
                  size={16}
                  color={colors.primary}
                  style={{ marginLeft: 3 }}
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
      ) : null}
    </LocalCard>
  );
}