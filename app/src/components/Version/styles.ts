import { StyleSheet } from 'react-native';
import { elevation, iconSize, radius, spacing, typography } from '@theme/tokens';

export const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.md,
        opacity: 0.6,
    },
    name: {
        fontSize: typography.size.sm,
        fontWeight: typography.weight.bold,
    },
    version: {
        fontSize: typography.size.xs,
        fontWeight: typography.weight.medium,
    },
    social: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        marginVertical: spacing.sm,    
    },
    button: {
        width: 40,
        height: 40,
        borderRadius: radius.md,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    copyright: {
        alignItems: 'center',
        justifyContent: 'center',
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