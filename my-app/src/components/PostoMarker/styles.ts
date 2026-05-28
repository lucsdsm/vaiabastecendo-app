import { StyleSheet } from 'react-native';
import { radius, spacing, typography } from '../../theme/tokens';   

export const styles = StyleSheet.create({
    markerCore: {
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden', 
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    flagImage: {
        width: 48,
        height: 48,
        borderRadius: radius.pill,
        resizeMode: 'contain',
    },
    flagImageSmall: {
        width: 32,
        height: 32,
        borderRadius: radius.pill,
        resizeMode: 'contain',
    },
});