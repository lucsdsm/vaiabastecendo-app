import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        paddingBottom: 5,
        ...Platform.select({
            ios: {
                // shadowColor: '#000',
                // shadowOffset: { width: 0, height: 2 },
                // shadowOpacity: 0.1,
                // shadowRadius: 4,
            },
            android: {
                // elevation: 4,
            },
        }),
        zIndex: 10,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    titleContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        marginLeft: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: '900',
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '400',
        marginTop: 10,
    },
    themeButton: {
        padding: 10,
    },
});
