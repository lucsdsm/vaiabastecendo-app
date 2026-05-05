import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
    },
    loggedContainer: {
        flex: 1,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginTop: 16,
        marginBottom: 16
    },
    avatar: {
        width: 86,
        height: 86,
        borderRadius: 43,
    },
    avatarPlaceholder: {
        width: 86,
        height: 86,
        borderRadius: 43,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoSection: {
        flex: 1,
        marginLeft: 20,
        justifyContent: 'center',
    },
    usernameText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    statsContainer: {
        flexDirection: 'row',
        gap: 24, 
    },
    statItem: {
        alignItems: 'flex-start',
    },
    statNumber: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    statLabel: {
        fontSize: 13,
        marginTop: 2,
    },
    bioText: {
        fontSize: 14,
        paddingHorizontal: 16,
        marginTop: 16,
        marginBottom: 20,
        lineHeight: 20,
    },
    actionButton: {
        marginHorizontal: 16,
        paddingVertical: 8,
        borderWidth: 1,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionButtonText: {
        fontWeight: '600',
        fontSize: 14,
    },
    guestContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    guestIconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    guestTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    guestText: {
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 32,
        lineHeight: 22,
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
});