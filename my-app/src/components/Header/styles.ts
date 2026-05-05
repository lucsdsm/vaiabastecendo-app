import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
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
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 10,
    },
    titleContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1,
    },
    title: {
        fontSize: 32,
        fontWeight: '900',
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 18,
    },
    // characterImage: {
    //     width: 96,
    //     height: 96,
    // },
    themeButtonContainer: {
        padding: 10,
    },
    themeButton: {
        padding: 10,
    },
});
