export type BadgeTier = 'none' | 'bronze' | 'prata' | 'ouro' | 'diamante' | 'esmeralda';

export interface BadgeInfo {
  tier: BadgeTier;
  label: string;
  iconName?: string;
  minLikes: number;
  maxLikes: number | null;
  nextLabel?: string;
  nextTarget?: number | null;
  remaining?: number | null;
  progress: number;
  progressText?: string;
  ringColor: string;
  trackColor: string;
}

const tiers = [
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
    iconName: 'award',
    minLikes: 5,
    maxLikes: 24,
    ringColor: '#CD7F32',
    trackColor: 'rgba(205,127,50,0.14)',
  },
  {
    tier: 'prata',
    label: 'Prata',
    iconName: 'award',
    minLikes: 25,
    maxLikes: 49,
    ringColor: '#C0C0C0',
    trackColor: 'rgba(192,192,192,0.14)',
  },
  {
    tier: 'ouro',
    label: 'Ouro',
    iconName: 'award',
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

  if (likesReceived < 5) {
    return {
      tier: 'none',
      label: '',
      minLikes: 0,
      maxLikes: 5,
      progress: likesReceived / 5,
      ringColor: 'transparent',
      trackColor: 'rgba(0,0,0,0.08)',
      nextLabel: 'Bronze',
      nextTarget: 5,
      remaining: Math.max(0, 5 - likesReceived),
      progressText: `${likesReceived}/5`,
    };
  }

  const index = tiers.findIndex((item) =>
    item.maxLikes === null
      ? likesReceived >= item.minLikes
      : likesReceived >= item.minLikes && likesReceived <= item.maxLikes
  );

  const rule = index >= 0 ? tiers[index] : tiers[0];
  const nextRule = index >= 0 ? tiers[index + 1] : tiers[0];

  const progress =
    rule.maxLikes === null
      ? 1
      : Math.min(
          1,
          (likesReceived - rule.minLikes) / (rule.maxLikes - rule.minLikes + 1)
        );

  const nextTarget = nextRule?.minLikes ?? null;
  const remaining = nextTarget !== null ? Math.max(0, nextTarget - likesReceived) : null;

  return {
    tier: rule.tier,
    label: rule.label,
    iconName: rule.iconName,
    minLikes: rule.minLikes,
    maxLikes: rule.maxLikes,
    progress,
    progressText: `${likesReceived}/${nextTarget ?? '∞'}`,
    ringColor: rule.ringColor,
    trackColor: rule.trackColor,
    nextLabel: nextRule?.label,
    nextTarget,
    remaining,
  };
}

export function getBadgeLabel(likesReceived: number) {
  return getBadgeInfo(likesReceived).label;
}