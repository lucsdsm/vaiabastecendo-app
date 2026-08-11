import { StyleSheet } from 'react-native';
import { elevation, iconSize, radius, spacing, typography } from '@theme/tokens';

export const styles = StyleSheet.create({
  position: {
    position: 'absolute',
    top: 0,
    left: spacing.md,
    right: spacing.md,
    zIndex: 9999,
    elevation: 9999,
  },

  card: {
    overflow: 'hidden',
    borderRadius: radius.lg,
    paddingTop: spacing.md,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    backgroundColor: '#FFFFFF',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },

  icon: {
    width: iconSize.lg,
    height: iconSize.lg,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },

  content: {
    flex: 1,
    minWidth: 0,
    gap: spacing.xs,
  },

  title: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.bold,
    color: '#161616',
  },

  message: {
    fontSize: typography.size.xs + 1,
    lineHeight: 19,
    color: '#656565',
    marginBottom: spacing.md,
  },

  actions: {
    marginTop: spacing.sm,
    alignItems: 'flex-end',
  },

  action: {
    minHeight: iconSize.lg,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },

  text: {
    fontSize: typography.size.xs + 1,
    fontWeight: typography.weight.bold,
    color: '#FFFFFF',
  },

  track: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },

  bar: {
    height: '100%',
  },
});
