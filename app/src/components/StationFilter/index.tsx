import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

import { StationFilterOption, StationFilterSelectorSize, StationFilterSelectorVariant, useStationFilterSelector } from './useStationFilter';

import { styles } from './styles';

interface StationFilterSelectorProps {
  label: string;
  options: StationFilterOption[];
  selectedFilter: string | number | null;
  onSelectFilter: (value: string | number | null) => void;
  variant?: StationFilterSelectorVariant;
  size?: StationFilterSelectorSize;
  showCheckIcon?: boolean;
}

export default function StationFilterSelector({
  label,
  options,
  selectedFilter,
  onSelectFilter,
  variant = 'surface',
  size = 'regular',
  showCheckIcon = true,
}: StationFilterSelectorProps) {
  const { colors, getChipStyles, handleSelectFilter } = useStationFilterSelector({
    selectedFilter,
    onSelectFilter,
    variant,
    size,
  });

  return (
    <View>
      {options.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scroll}
          contentContainerStyle={styles.content}
        >
          {options.map((option) => {
            const { isSelected, accentColor, chipStyle, textStyle } = getChipStyles(option);

            return (
              <TouchableOpacity
                key={String(option.value)}
                style={chipStyle}
                onPress={() => handleSelectFilter(option.value)}
                activeOpacity={0.7}>
                <Text style={textStyle}>{option.label}</Text>

                {showCheckIcon && isSelected && (
                  <FontAwesome6
                    name="check"
                    iconStyle="solid"
                    size={13}
                    color={accentColor}
                    style={styles.check}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : (
        <Text style={[styles.empty, { color: colors.textSecondary }]}>
          Nenhum filtro disponível no momento.
        </Text>
      )}
    </View>
  );
}