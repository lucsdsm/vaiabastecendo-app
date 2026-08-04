import { StyleSheet } from 'react-native';
import { radius, spacing, typography } from '../../theme/tokens';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: spacing.md,
    overflow: 'hidden',
    borderRadius: radius.xl,
  },
  cardBody: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  ringWrap: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ringCenter: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
  },
  ringCount: {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.medium,
    lineHeight: 14,
  },
  ringPercent: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.bold,
    lineHeight: 20,
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.pill,
  },
  badgePillText: {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.bold,
  },
  meta: {
    width: '100%',
    alignItems: 'center',
    gap: 4,
  },
  title: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.bold,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.medium,
    textAlign: 'center',
  },
  helpText: {
    fontSize: typography.size.xs,
    lineHeight: 16,
    textAlign: 'center',
  },
});