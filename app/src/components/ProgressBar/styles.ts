import { StyleSheet } from 'react-native';
import { elevation, iconSize, radius, spacing, typography } from '@theme/tokens';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: spacing.md,
    overflow: 'hidden',
    borderRadius: radius.xl,
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
  },
  count: {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.medium,
    lineHeight: 14,
  },
  percent: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.bold,
    lineHeight: 20,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.pill,
  },
  text: {
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
  help: {
    fontSize: typography.size.xs,
    lineHeight: 16,
    textAlign: 'center',
  },
});