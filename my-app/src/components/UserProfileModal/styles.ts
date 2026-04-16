import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    content: {
        alignItems: 'center',
    },
    guestContainer: {
        alignItems: 'center',
        width: '100%',
    },
    guestText: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 20,
    },
    googleButton: {
        backgroundColor: '#DB4437',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingVertical: 14,
        borderRadius: 12,
        gap: 12,
    },
    googleButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loggedContainer: {
        alignItems: 'center',
        width: '100%',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    avatarImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E5E5E5',
    },
    welcomeText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subText: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 24,
    },
    logoutButton: {
        borderWidth: 1,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
    },
    logoutText: {
        fontWeight: 'bold',
    }
});