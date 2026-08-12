import { Platform, StyleSheet } from 'react-native';
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
        paddingVertical: spacing.sm,
        minHeight: 55,
        position: 'relative',
    },
    action: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 2,
    },
    wrapper: {
        position: 'absolute',
        left: 50,  
        right: 90,
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

    scroll: {
        flexGrow: 1,
    },
    content: {
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.xl,
        flex: 1,
    },
    section: {
        marginTop: spacing.xl,
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
    number: {
        flex: 1,
        fontSize: typography.size.hero + 4,
        fontWeight: typography.weight.bold,
        textAlign: 'center',
        paddingVertical: spacing.md,
        letterSpacing: -1,
    },
    suffix: {
        fontSize: typography.size.sm,
        fontWeight: typography.weight.medium,
        marginLeft: spacing.sm,
    },
});