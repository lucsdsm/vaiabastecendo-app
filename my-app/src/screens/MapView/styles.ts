import { StyleSheet } from 'react-native';
import { spacing } from '../../theme/tokens';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        position: 'relative',
    },
    cardOverlay: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        paddingHorizontal: spacing.md,
        paddingBottom: spacing.md,
        justifyContent: 'flex-end', 
    },
    cardWrapper: {
        elevation: 8,
    }
});