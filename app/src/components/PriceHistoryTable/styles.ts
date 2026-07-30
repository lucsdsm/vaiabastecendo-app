import { StyleSheet } from 'react-native';
import { spacing, typography, radius } from '../../theme/tokens';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.sm,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  titleBlock: {
    flex: 1,
  },
  eyebrow: {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  fuelName: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: radius.pill,
  },
  badgeText: {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  summaryItem: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: typography.size.xs,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.bold,
  },
  chartWrapper: {
    marginTop: spacing.xs,
    marginBottom: spacing.md,
    alignItems: 'center',
  },
  dataPoint: {
    bottom: 2.5,
    width: 10,
    height: 10,
    borderRadius: 999,
    borderWidth: 2,
  },
  tooltip: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.md,
    minWidth: 84,
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  tooltipPrice: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.bold,
  },
  tooltipLabel: {
    fontSize: typography.size.xs,
    marginTop: 2,
  },
  footer: {
    paddingTop: spacing.md,
  },
  footerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: spacing.sm,
  },
  footerTitle: {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  historyRow: {
    paddingVertical: spacing.sm,
  },
  historyMeta: {
    marginBottom: 2,
  },
  historyPrice: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
  },
  historyInfo: {
    fontSize: typography.size.xs,
  },
  historyDate: {
    fontSize: typography.size.xs,
  },
});