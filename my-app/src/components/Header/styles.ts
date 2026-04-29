import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 5,
        paddingBottom: 5,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 4,
            },
        }),
        zIndex: 10,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    logo: {
        marginLeft: 10,
        width: 64,
        height: 64,
        borderRadius: 360
    },
    titleContainer: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        fontFamily: 'StoryScript_400Regular',
    },
    subtitle: {
    },
    themeButton: {
        padding: 10,
    },
});
