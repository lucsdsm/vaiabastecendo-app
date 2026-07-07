import { StyleSheet } from 'react-native';
import { radius, spacing, typography } from '../../theme/tokens';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: spacing.lg,
        borderRadius: radius.xl,
        alignItems: 'center', 
        justifyContent: 'space-between',
        overflow: 'hidden',
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        elevation: 1,
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
        padding: spacing.lg,
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