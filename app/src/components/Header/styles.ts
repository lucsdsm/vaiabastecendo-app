import { Platform, StyleSheet } from 'react-native';
import { elevation, iconSize, radius, spacing, typography } from '@theme/tokens';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: spacing.sm,
        marginTop: spacing.md,
    },
    greeting: {
        fontSize: typography.size.sm,
        fontWeight: typography.weight.medium,
    },
    title: {
        fontSize: typography.size.xl,
        fontWeight: typography.weight.bold,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        marginTop: spacing.xs,
    },
    text: {
        fontSize: typography.size.xs,
        fontWeight: typography.weight.semibold,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md, 
    },
    theme: {
        width: 40,
        height: 40,
        borderRadius: radius.md,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
