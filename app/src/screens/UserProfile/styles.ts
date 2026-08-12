import { StyleSheet } from 'react-native';
import { spacing, typography  } from '@theme/tokens';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        minHeight: 55,    
    },
    action: {
        width: 40,           
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,            
    },
    wrapper: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    title: {
        fontSize: typography.size.xl,
        fontWeight: typography.weight.bold,
    },
    scroll: {
        flexGrow: 1,
        marginHorizontal: spacing.md,
    },
    guest: {
        flexGrow: 1,
        justifyContent: 'center',
        marginHorizontal: spacing.md,
    },
    body: {
        alignItems: 'center',
    },
});