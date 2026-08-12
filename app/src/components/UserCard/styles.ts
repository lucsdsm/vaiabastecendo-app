import { StyleSheet } from 'react-native';
import { elevation, iconSize, radius, spacing, typography } from '@theme/tokens';

export const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    avatar: {
        width: 86,
        height: 86,
        borderRadius: radius.pill,
    },
    placeholder: {
        width: 86,
        height: 86,
        borderRadius: radius.pill,
        alignItems: 'center',
        justifyContent: 'center',
    },
    info: {
        flex: 1,
        marginLeft: spacing.xl,
        justifyContent: 'center',
    },
    name: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    username: {
        fontSize: typography.size.lg,
        fontWeight: typography.weight.bold,
        marginBottom: spacing.xs, 
    },
    stats: {
        flexDirection: 'row',
        gap: spacing.xxl,
    },
    item: {
        alignItems: 'flex-start',
    },
    number: {
        fontSize: typography.size.lg,
        fontWeight: typography.weight.bold,
    },
    label: {
        fontSize: typography.size.xs,
        marginTop: 2,
    },
});