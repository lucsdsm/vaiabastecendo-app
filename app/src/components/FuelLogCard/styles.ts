import { StyleSheet } from 'react-native';
import { elevation, iconSize, radius, spacing, typography } from '@theme/tokens';

export const styles = StyleSheet.create({
    card: {
        borderRadius: radius.md,
        marginBottom: 16,
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing.md,
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 32,
        height: 32,
        borderRadius: radius.sm,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    fuel: {
        fontSize: 16,
        fontWeight: typography.weight.bold,
    },
    date: {
        fontSize: 13,
        fontWeight: typography.weight.medium,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.md,
        paddingBottom: spacing.md,
    },
    block: {
        flex: 1,
    },
    divider: {
        width: 1,
        height: '80%',
        alignSelf: 'center',
        marginHorizontal: spacing.sm,
        opacity: 0.5,
    },
    label: {
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
        fontWeight: typography.weight.bold,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
    },
    right: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap', 
        justifyContent: 'flex-end', 
        alignItems: 'center',
        gap: spacing.sm, 
    },
    distance: {
        fontSize: 12,
        marginTop: 2,
        opacity: 0.7,
        marginLeft: 18,
    },
    odometer: {
        flexShrink: 0, 
        marginRight: spacing.sm,
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: 12,
        fontSize: 12,
        fontWeight: typography.weight.bold,
    },
    text: {
        fontSize: 11,
        fontWeight: typography.weight.bold,
    },
});