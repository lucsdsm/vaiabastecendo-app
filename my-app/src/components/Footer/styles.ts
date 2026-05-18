import { Platform, StyleSheet } from 'react-native';
import { radius, spacing, typography } from '../../theme/tokens';

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingBottom: Platform.OS === 'ios' ? spacing.xxl : spacing.xl,
        paddingTop: spacing.md,
        borderTopLeftRadius: radius.xl,
        borderTopRightRadius: radius.xl,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 8,
            },
        }),
        zIndex: 10,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    button: {
        alignItems: 'center', 
        justifyContent: 'center',
        flex: 1,
        minHeight: 44,
    },
    centerButtonWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    centerButton: {
        width: 56,
        height: 56,
        borderRadius: radius.pill,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -35,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
            },
            android: {
                elevation: 6,
            },
        }),
    },
    centerLabel: {
        fontSize: typography.size.xs,
        marginTop: spacing.sm,
        fontWeight: typography.weight.medium,
    },
    label: {
        fontSize: typography.size.xs,
        marginTop: spacing.xs,
    },
});
