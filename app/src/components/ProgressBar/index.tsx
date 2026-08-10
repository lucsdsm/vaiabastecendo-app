import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { getBadgeInfo } from '@utils/badgeRules';

import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

import { useAppTheme } from '@theme/ThemeProvider';

import { styles } from './styles';

export interface ProgressBarData {
  likes_received?: number | null;
  likes_given?: number | null;
}

interface ProgressBarProps {
  userData?: ProgressBarData | null;
  showAuthorBadge?: boolean;
}

function BadgeRing({
  progress,
  progressText,
  trackColor,
  size = 88,
  strokeWidth = 7,
}: {
  progress: number;
  progressText: string;
  ringColor: string;
  trackColor: string;
  size?: number;
  strokeWidth?: number;
}) {
  const { colors, isDark } = useAppTheme();

  const normalized = Math.max(0, Math.min(1, progress));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - normalized);
  const center = size / 2;

  return (
    <View style={[styles.wrapper, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          rotation={-90}
          originX={center}
          originY={center}
        />
      </Svg>

        <View style={styles.center}>
            <Text style={[styles.percent, { color: colors.textPrimary }]}>
                {Math.round(normalized * 100)}%
            </Text>

            <Text style={[styles.count, { color: colors.textSecondary }]}>
                {progressText}
            </Text>
        </View>
    </View>
  );
}

export default function ProgressBar({
  userData,
}: ProgressBarProps) {
  const { colors, isDark } = useAppTheme();

  const likesReceived = userData?.likes_received ?? 0;
  const badge = useMemo(() => getBadgeInfo(likesReceived), [likesReceived]);

  return (
    <View
      style={[
        styles.container, {backgroundColor: colors.surface}]}>
      <View style={styles.card}>
        <BadgeRing
          progress={badge.progress}
          ringColor={badge.ringColor}
          trackColor={badge.trackColor}
          progressText={badge.progressText}
        />
          
        {badge.tier !== 'none' ? (
            <View style={[styles.badge, { backgroundColor: badge.trackColor }]}>
                
                <Text style={[styles.text, { color: badge.ringColor }]}>
                    {badge.label}
                </Text>

                <FontAwesome6 name={badge.iconName} size={12} color={badge.ringColor} iconStyle='solid' />
            </View>
        ) : null}

        <View style={styles.meta}>
            {badge.tier !== 'esmeralda' ? (
                <Text style={[styles.help, { color: colors.textSecondary }]}>
                    Receba mais {badge.remaining} reações para obter o selo {badge.nextLabel}.
                    Continue contribuindo para evoluir sua reputação na comunidade.
                </Text>
            ) : (
                <Text style={[styles.help, { color: colors.textSecondary }]}>
                    Parabéns! Você atingiu o nível máximo de reputação na comunidade.
                </Text>
            )}
        </View>
      </View>
    </View>
  );
}