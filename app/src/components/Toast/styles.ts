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
    borderRadius: radius.md,
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

  container: {
    width: 32,
    height: 32,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
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
    marginHorizontal: -spacing.md,
    marginBottom: -spacing.sm,
  },

  action: {
    width: '100%',
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },

  actionText: {
    fontSize: typography.size.xs + 1,
    fontWeight: typography.weight.bold,
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },

  track: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    overflow: 'hidden',
    zIndex: 1,
  },

  bar: {
    height: '100%',
    width: '100%',
  },
});
