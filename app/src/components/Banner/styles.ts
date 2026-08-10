import { StyleSheet } from 'react-native';
import { elevation, iconSize, radius, spacing, typography } from '@theme/tokens';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: spacing.lg,
        marginVertical: spacing.md,
        borderRadius: radius.xl,
        alignItems: 'center', 
        justifyContent: 'space-between',
        overflow: 'hidden',
        position: 'relative',
    },
    gradient: {
        width: '150%',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'space-between',
        width: '100%',
    },
    left: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        textAlign: 'left',
        fontSize: typography.size.xxl, 
        fontWeight: typography.weight.black,
        padding: spacing.sm,
    },
    right: {
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
});