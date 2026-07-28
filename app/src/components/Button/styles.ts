import { StyleSheet } from 'react-native';
import { radius, spacing, typography } from '../../theme/tokens';

export const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    alignSelf: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  iconLeft: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.bold,
    letterSpacing: 0.2,
  },
});