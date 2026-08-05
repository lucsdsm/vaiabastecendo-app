import { StyleSheet } from 'react-native';
import { spacing, elevation, radius } from '../../theme/tokens';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        position: 'relative',
    },
    fab: {
        position: 'absolute',
        top: 25,
        left: 10,
        width: 45,
        height: 45,
        borderRadius: radius.pill,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5,
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
        elevation: elevation.low,
    }
});