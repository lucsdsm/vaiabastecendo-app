import { Platform, StyleSheet } from 'react-native';
import { radius, spacing, typography } from '../../theme/tokens';

export const styles = StyleSheet.create({
    container: {
        zIndex: 10,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: spacing.sm,
        marginTop: spacing.md,
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    greetingText: {
        fontSize: typography.size.sm,
        fontWeight: typography.weight.medium,
        marginBottom: 2,
    },
    title: {
        fontSize: typography.size.xl,
        fontWeight: typography.weight.bold,
        marginBottom: 4,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    locationText: {
        fontSize: typography.size.xs,
        fontWeight: typography.weight.semibold,
    },
    actionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md, 
    },
    iconButton: {
        padding: spacing.xs,
        position: 'relative',
    },
    notificationBadge: {
        position: 'absolute',
        top: 2,
        right: 4,
        width: 8,
        height: 8,
        borderRadius: radius.md,
        borderWidth: 1.5,
        borderColor: '#FFFFFF', 
    },
    themeButton: {
        width: 40,
        height: 40,
        borderRadius: radius.md,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
