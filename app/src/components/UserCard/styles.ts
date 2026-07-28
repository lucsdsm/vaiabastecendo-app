import { StyleSheet } from 'react-native';
import { radius, spacing, typography } from '../../theme/tokens';

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: spacing.lg,
        marginBottom: spacing.lg,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },

    // perfil
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

    // estatísticas
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

    // gameficacao
    progressSection: {
        width: '100%',
    },
    badgeContainer: {
        padding: spacing.md,
        borderRadius: radius.lg,
        borderWidth: 1,
        alignItems: 'flex-start',
        gap: spacing.xs,
        width: '100%',
    },
    badgeText: {
        fontSize: typography.size.sm,
        fontWeight: typography.weight.bold,
    },
    badgeSubtext: {
        fontSize: typography.size.xs,
        lineHeight: 16,
    },
    progressContainer: {
        width: '100%',
        gap: spacing.sm,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    progressTitle: {
        fontSize: typography.size.sm,
        fontWeight: typography.weight.bold,
    },
    counter: {
        fontSize: typography.size.xs,
        fontWeight: typography.weight.medium,
    },
    progressBarTrack: {
        height: 10,
        width: '100%',
        borderRadius: radius.pill,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: radius.pill,
    },
    helpText: {
        fontSize: typography.size.xs,
        lineHeight: 16,
        paddingHorizontal: 2,
        textAlign: 'justify',
    },
});