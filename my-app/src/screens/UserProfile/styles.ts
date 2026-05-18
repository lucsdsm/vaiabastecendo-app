import { StyleSheet } from 'react-native';
import { radius, spacing, typography } from '../../theme/tokens';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
    },
    headerTitle: {
        fontSize: typography.size.xl,
        fontWeight: typography.weight.bold,
    },
    content: {
        flex: 1,
    },
    loggedContainer: {
        flex: 1,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        marginTop: spacing.lg,
        marginBottom: spacing.lg
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
    usernameText: {
        fontSize: typography.size.lg,
        fontWeight: typography.weight.bold,
        marginBottom: spacing.sm,
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
    bioText: {
        fontSize: typography.size.sm,
        paddingHorizontal: spacing.lg,
        marginTop: spacing.lg,
        marginBottom: spacing.xl,
        lineHeight: 20,
    },
    actionButton: {
        marginHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        borderWidth: 1,
        borderRadius: radius.sm,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionButtonText: {
        fontWeight: typography.weight.semibold,
        fontSize: typography.size.sm,
    },
    guestContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: spacing.xxl,
    },
    guestIconContainer: {
        width: 100,
        height: 100,
        borderRadius: radius.pill,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.xxl,
    },
    guestTitle: {
        fontSize: typography.size.xl,
        fontWeight: typography.weight.bold,
        marginBottom: spacing.md,
    },
    guestText: {
        fontSize: typography.size.sm,
        textAlign: 'center',
        marginBottom: spacing.xxxl,
        lineHeight: 22,
    },
    googleButton: {
        backgroundColor: '#DB4437',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingVertical: spacing.md,
        borderRadius: radius.md,
        gap: spacing.md,
    },
    googleButtonText: {
        color: '#FFF',
        fontSize: typography.size.md,
        fontWeight: typography.weight.bold,
    },
});