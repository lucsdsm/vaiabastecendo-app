import { Platform, StyleSheet } from 'react-native';
import { elevation, iconSize, radius, spacing, typography } from '@theme/tokens';

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingBottom: Platform.OS === 'ios' ? spacing.xxl : spacing.xl,
        paddingTop: spacing.md,
        borderTopLeftRadius: radius.xl,
        borderTopRightRadius: radius.xl,
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
    center: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    highlight: {
        width: 56,
        height: 56,
        borderRadius: radius.pill,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -45,
    },
    label: {
        fontSize: typography.size.xs,
        marginTop: spacing.xs,
        fontWeight: typography.weight.medium,
    },
});
