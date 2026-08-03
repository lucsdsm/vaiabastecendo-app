export type BadgeTier = 'none' | 'bronze' | 'prata' | 'ouro' | 'diamante' | 'esmeralda';

export interface BadgeInfo {
  tier: BadgeTier;
  label: string;
  iconName: string;
  minLikes: number;
  maxLikes: number | null;
  progress: number;
  ringColor: string;
  trackColor: string;
}

const TIERS = [
  {
    tier: 'none',
    label: 'Nenhum',
    iconName: 'none',
    minLikes: 0,
    maxLikes: 4,
    ringColor: '#808080',
    trackColor: 'rgba(128,128,128,0.14)',
  },
  {
    tier: 'bronze',
    label: 'Bronze',
    iconName: 'medal',
    minLikes: 5,
    maxLikes: 24,
    ringColor: '#CD7F32',
    trackColor: 'rgba(205,127,50,0.14)',
  },
  {
    tier: 'prata',
    label: 'Prata',
    iconName: 'medal',
    minLikes: 25,
    maxLikes: 49,
    ringColor: '#C0C0C0',
    trackColor: 'rgba(192,192,192,0.14)',
  },
  {
    tier: 'ouro',
    label: 'Ouro',
    iconName: 'medal',
    minLikes: 50,
    maxLikes: 74,
    ringColor: '#D4AF37',
    trackColor: 'rgba(212,175,55,0.14)',
  },
  {
    tier: 'diamante',
    label: 'Diamante',
    iconName: 'diamond',
    minLikes: 75,
    maxLikes: 99,
    ringColor: '#6FE7FF',
    trackColor: 'rgba(111,231,255,0.16)',
  },
  {
    tier: 'esmeralda',
    label: 'Esmeralda',
    iconName: 'gem',
    minLikes: 100,
    maxLikes: null,
    ringColor: '#50C878',
    trackColor: 'rgba(80,200,120,0.14)',
  },
] as const;

export function getBadgeInfo(likesReceived: number): BadgeInfo {
  const rule =
    TIERS.find((item) =>
      item.maxLikes === null
        ? likesReceived >= item.minLikes
        : likesReceived >= item.minLikes && likesReceived <= item.maxLikes
    ) ?? TIERS[0];

  const progress =
    rule.maxLikes === null
      ? 1
      : Math.min(
          1,
          (likesReceived - rule.minLikes) / (rule.maxLikes - rule.minLikes + 1)
        );

  return {
    tier: rule.tier,
    label: rule.label,
    iconName: rule.iconName,
    minLikes: rule.minLikes,
    maxLikes: rule.maxLikes,
    progress,
    ringColor: rule.ringColor,
    trackColor: rule.trackColor,
  };
}

export function getBadgeLabel(likesReceived: number) {
  return getBadgeInfo(likesReceived).label;
}