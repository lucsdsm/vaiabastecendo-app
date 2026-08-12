import { StyleSheet } from 'react-native';
import { elevation, iconSize, radius, spacing, typography } from '@theme/tokens';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        minHeight: 56,
        position: 'relative',
    },
    actions: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
    },
    wrapper: {
        position: 'absolute',
        left: 60,
        right: 60,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    title: {
        fontSize: typography.size.xl,
        fontWeight: typography.weight.bold,
    },
    content: {
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.xl,
    },
    section: {
        marginTop: spacing.lg,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        fontSize: typography.size.xs + 1,
        fontWeight: typography.weight.semibold,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: spacing.sm,
        marginLeft: spacing.sm,
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: radius.lg,
        borderWidth: 1.5,
        paddingHorizontal: spacing.md,
        paddingVertical: 4,
    },
    text: {
        flex: 1,
        fontSize: typography.size.lg,
        fontWeight: typography.weight.bold,
        paddingVertical: spacing.md,
    },
    prefix: {
        fontSize: typography.size.md,
        fontWeight: typography.weight.medium,
        marginRight: spacing.xs,
    },
    suffix: {
        fontSize: typography.size.sm,
        fontWeight: typography.weight.medium,
        marginLeft: spacing.xs,
    },
    frame: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: spacing.xl,
        padding: spacing.md,
        borderRadius: radius.lg,
    },
    word: {
        flex: 1,
        paddingRight: spacing.md,
    },
    head: {
        fontSize: typography.size.md,
        fontWeight: typography.weight.bold,
        marginBottom: 2,
    },
    desc: {
        fontSize: typography.size.xs,
        lineHeight: 16,
    },
});