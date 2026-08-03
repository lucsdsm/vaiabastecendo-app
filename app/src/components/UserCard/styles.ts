import { StyleSheet } from 'react-native';
import { radius, spacing, typography } from '../../theme/tokens';

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: spacing.sm,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    avatar: {
        width: 86,
        height: 86,
        borderRadius: radius.pill,
    },
    avatarPlaceholder: {
        width: 86,
        height: 86,
        borderRadius: radius.pill,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoSection: {
        flex: 1,
        marginLeft: spacing.xl,
        justifyContent: 'center',
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    verifiedIcon: {
        marginLeft: spacing.xs,
    },
    usernameText: {
        fontSize: typography.size.lg,
        fontWeight: typography.weight.bold,
        marginBottom: spacing.xs, 
    },
    statsContainer: {
        flexDirection: 'row',
        gap: spacing.xxl,
    },
    statItem: {
        alignItems: 'flex-start',
    },
    statNumber: {
        fontSize: typography.size.lg,
        fontWeight: typography.weight.bold,
    },
    statLabel: {
        fontSize: typography.size.xs,
        marginTop: 2,
    },
});