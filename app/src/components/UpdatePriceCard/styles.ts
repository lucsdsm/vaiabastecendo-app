import { Platform, StyleSheet } from 'react-native';
import { elevation, iconSize, radius, spacing, typography } from '@theme/tokens';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: spacing.md,
    },
    shell: {
        flex: 1,
        justifyContent: 'center',
    },
    label: {
        fontSize: typography.size.xs + 1,
        fontWeight: typography.weight.semibold,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginLeft: spacing.sm,
        marginBottom: spacing.sm,
        marginTop: spacing.xl,
    },
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: radius.xl,
        borderWidth: 1.5,
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.sm,
    },
    prefix: {
        fontSize: typography.size.lg,
        fontWeight: typography.weight.semibold,
        marginRight: spacing.sm,
    },
    input: {
        flex: 1,
        fontSize: typography.size.hero + 4, // 32
        fontWeight: typography.weight.bold,
        textAlign: 'center',
        letterSpacing: -1,
    },
    suffix: {
        fontSize: typography.size.sm,
        fontWeight: typography.weight.medium,
        marginLeft: spacing.sm,
    },
});
