import { StyleSheet } from 'react-native';
import { spacing, typography, radius } from '@theme/tokens';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.sm,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  title: {
    flex: 1,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  eyebrow: {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  fuel: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: radius.pill,
  },
  text: {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
    marginBottom: spacing.md,
    paddingVertical: spacing.xs,
  },
  item: {
    flex: 1,
  },
  label: {
    fontSize: typography.size.xs,
    marginBottom: 4,
  },
  value: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.bold,
  },
  wrapper: {
    marginTop: spacing.xs,
    marginBottom: spacing.md,
    alignItems: 'center',
  },
  dataPoint: {
    bottom: 2.5,
    width: 10,
    height: 10,
    borderRadius: radius.pill,
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
  price: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.bold,
  },
  footer: {
    paddingTop: spacing.md,
  },
  meta: {
    marginBottom: 2,
  }
  ,
  info: {
    fontSize: typography.size.xs,
  },
  date: {
    fontSize: typography.size.xs,
    alignSelf: 'center',
  },
});