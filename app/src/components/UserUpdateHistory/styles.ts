import { StyleSheet } from 'react-native';
import { radius, spacing, typography } from '../../theme/tokens';

export const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },

  header: {
    marginBottom: spacing.md,
  },

  eyebrow: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.bold,
  },

  listContent: {
  },

  timelineRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },

  timelineColumn: {
    width: 22,
    alignItems: 'center',
    paddingTop: 8,
  },

  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    borderWidth: 2,
    zIndex: 2,
  },

  timelineLine: {
    width: 1,
    flex: 1,
    marginTop: 4,
    minHeight: 56,
  },

  itemCard: {
    flex: 1,
    borderRadius: radius.lg,
    padding: spacing.md,
  },

  itemTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },

  itemTitleBlock: {
    flex: 1,
  },

  stationName: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
    marginBottom: 4,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
  },

  fuelType: {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
  },

  metaDivider: {
    fontSize: typography.size.xs,
  },

  brandText: {
    fontSize: typography.size.xs,
  },

  priceBlock: {
    alignItems: 'flex-end',
  },

  priceValue: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.bold,
  },

  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.sm,
  },

  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },

  footerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  footerText: {
    fontSize: typography.size.xs,
    marginLeft: 4,
  },

  emptyState: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: spacing.md,
  },

  emptyIconContainer: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyTextContainer: {
    flex: 1,
  },

  emptyTitle: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
    marginBottom: 2,
  },

  emptyText: {
    fontSize: typography.size.xs,
    lineHeight: 16,
  },
});