import { StyleSheet } from 'react-native';
import { radius, spacing, typography } from '../../theme/tokens';

export const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.xl,
        opacity: 0.6, 
    },
    appName: {
        fontSize: typography.size.sm,
        fontWeight: typography.weight.bold,
    },
    version: {
        fontSize: typography.size.xs,
        fontWeight: typography.weight.medium,
    },
    copyrightContainer: {
        alignItems: 'center',
    },
    text: {
        fontSize: 10,
        lineHeight: 14,
    },
    credits: {
        fontSize: 10,
        fontWeight: typography.weight.medium,
        opacity: 0.6,
    },
})