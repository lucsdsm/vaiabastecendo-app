import { StyleSheet } from 'react-native';
import { elevation, iconSize, radius, spacing, typography } from '@theme/tokens'; 

export const styles = StyleSheet.create({
    marker: {
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden', 
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 48,
        height: 48,
        borderRadius: radius.pill,
        resizeMode: 'contain',
    },
    small: {
        width: 32,
        height: 32,
        borderRadius: radius.pill,
        resizeMode: 'contain',
    },
});