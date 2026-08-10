import { StyleSheet } from 'react-native';
import { elevation, iconSize, radius, spacing, typography } from '@theme/tokens';

export const styles = StyleSheet.create({
  empty: {
    fontWeight: typography.weight.regular,
    marginLeft: spacing.sm,
    lineHeight: 20,
    textAlign: 'left',
  },
  scroll: {
    flexGrow: 0,
    borderRadius: radius.md,
    marginBottom: spacing.md,
  },
  content: {
    gap: spacing.sm,
    paddingRight: spacing.xs,
  },
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 1.5,
  },
  chip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: 6,
  },
  text: {
    fontWeight: typography.weight.semibold,
    letterSpacing: -0.1,
  },
  check: {
    marginLeft: 2,
  },
});