import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
    },

    // Wrapper externo do marcador — precisa ser generoso para
    // a sombra / halo de selecao nao ser cortada pelo MapView.
    // Largura/altura devem comportar o anel (56px) + borda (3px cada lado) = 62px minimo
    markerWrapper: {
        alignItems: 'center',
        width: 64,
        height: 72,
    },

    // Container relativo que envolve pino + anel, garantindo que o
    // position:absolute do anel seja relativo ao pino e nao ao wrapper
    pinContainer: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Pino principal
    markerPin: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 8,
            },
            android: {
                elevation: 6,
            },
        }),
    },

    // Versao compacta (nao selecionado)
    markerPinSmall: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1.5,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 3,
            },
        }),
    },

    flagImage: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },

    flagImageSmall: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
    },

    // Pontinho triangular embaixo do pino quando selecionado
    markerTail: {
        width: 0,
        height: 0,
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderTopWidth: 7,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        marginTop: -1,
    },

    // Anel de destaque ao redor do marcador selecionado.
    // position: 'absolute' relativo ao pinContainer (40x40).
    // O anel (56x56) expande 8px em cada lado alem do pino (40px).
    // top/left = (40 - 56) / 2 = -8
    markerRing: {
        position: 'absolute',
        top: -8,
        left: -8,
        width: 56,
        height: 56,
        borderRadius: 28,
        borderWidth: 3,
        opacity: 0.3,
    },
});
