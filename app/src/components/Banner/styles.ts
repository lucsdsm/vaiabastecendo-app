import { StyleSheet } from 'react-native';
import { radius, spacing, typography } from '../../theme/tokens';

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
    gradientWrapper: {
        width: '150%',
    },
    leftContent: {
        flex: 1,
        justifyContent: 'center',
    },
    contentWrapper: {
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'space-between',
        width: '100%',
    },
    text: {
        textAlign: 'left',
        fontSize: typography.size.xxl, 
        fontWeight: typography.weight.black,
    },
    rightContent: {
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
});