import { StyleSheet } from 'react-native';
import { spacing } from '../../theme/tokens';

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flex: 1
    },
    centerLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listContainer: {
        marginTop: spacing.sm,
        paddingHorizontal: spacing.xl, 
        paddingBottom: spacing.xl 
    },
});
