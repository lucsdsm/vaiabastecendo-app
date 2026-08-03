import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

import { useAppTheme } from '../../theme/ThemeProvider';
import { getBadgeInfo } from '../../utils/badgeRules';
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
  ringColor,
  trackColor,
  size = 88,
  strokeWidth = 7,
}: {
  progress: number;
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
    <View style={[styles.ringWrap, { width: size, height: size }]}>
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

      <View style={styles.ringCenter}>
        <Text style={[styles.ringPercent, { color: colors.textPrimary }]}>
          {Math.round(normalized * 100)}%
        </Text>
      </View>
    </View>
  );
}

export default function ProgressBar({
  userData,
  showAuthorBadge = true,
}: ProgressBarProps) {
  const { colors, isDark } = useAppTheme();

  const likesReceived = userData?.likes_received ?? 0;
  const badge = useMemo(() => getBadgeInfo(likesReceived), [likesReceived]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
        },
      ]}
    >
      <View style={styles.cardBody}>
        <BadgeRing
          progress={badge.progress}
          ringColor={badge.ringColor}
          trackColor={badge.trackColor}
        />
          
        {badge.tier !== 'none' ? (
            <View style={[styles.badgePill, { backgroundColor: badge.trackColor }]}>
                <FontAwesome6 name="medal" size={12} color={badge.ringColor} iconStyle='solid' />
                <Text style={[styles.badgePillText, { color: badge.ringColor }]}>
                    {badge.label}
                </Text>
            </View>
        ) : null}

        <View style={styles.meta}>
          <Text style={[styles.helpText, { color: colors.textSecondary }]}>
            Continue contribuindo para evoluir sua reputação na comunidade.
          </Text>
        </View>
      </View>
    </View>
  );
}