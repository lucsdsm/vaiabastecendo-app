import { StyleSheet } from 'react-native';
import { elevation, iconSize, radius, spacing, typography } from '@theme/tokens';

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

  list: {
  },

  loading: {
  },

  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },

  column: {
    width: 22,
    alignItems: 'center',
    paddingTop: 8,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    borderWidth: 2,
    zIndex: 2,
  },

  line: {
    width: 1,
    flex: 1,
    marginTop: 4,
    minHeight: 56,
  },

  item: {
    flex: 1,
    borderRadius: radius.lg,
    padding: spacing.md,
  },

  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },

  title: {
    flex: 1,
  },

  name: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
    marginBottom: 4,
  },

  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
  },

  fuel: {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
  },

  block: {
    alignItems: 'flex-end',
  },

  value: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.bold,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.sm,
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },

  right: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  text: {
    fontSize: typography.size.xs,
    marginLeft: 4,
  }
});