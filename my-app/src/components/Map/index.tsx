import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Image, Platform, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useAppTheme } from '../../theme/ThemeProvider';
import { PostoProps } from '../PostoCard';
import { dicionarioBandeiras } from '../../utils/dictFlags';
import { styles } from './styles';
import { darkMapStyle } from './mapStyles';

interface MapProps {
    postos: PostoProps[];
    initialRegion: Region;
    targetRegion?: Region | null;
    recenterToken?: number;
    selectedPostoId?: string | null;
    onSelectPosto: (posto: PostoProps) => void;
    onMapPress: () => void;
}

// ---------------------------------------------------------------------------
// Marcador isolado como componente memo — evita que todos os marcadores
// re-renderizem quando apenas um muda (ex: selecao)
// ---------------------------------------------------------------------------
interface PostoMarkerProps {
    posto: PostoProps;
    isSelected: boolean;
    primaryColor: string;
    surfaceColor: string;
    onPress: (posto: PostoProps) => void;
    tracksViewChanges: boolean;
}

const PostoMarker = memo(({
    posto,
    isSelected,
    primaryColor,
    surfaceColor,
    onPress,
    tracksViewChanges,
}: PostoMarkerProps) => {
    const flagSource = dicionarioBandeiras[posto.bandeira];

    const handlePress = useCallback(
        (e: any) => {
            e.stopPropagation();
            onPress(posto);
        },
        [posto, onPress]
    );

    return (
        <Marker
            key={posto.id}
            coordinate={{
                latitude: Number(posto.latitude),
                longitude: Number(posto.longitude),
            }}
            anchor={{ x: 0.5, y: 0.5 }}
            // Android precisa de true por alguns frames para renderizar o view customizado.
            tracksViewChanges={tracksViewChanges}
            onPress={handlePress}
        >
            <View collapsable={false} style={styles.markerWrapper}>
                {/* Anel de destaque (visivel somente quando selecionado) */}
                {isSelected && (
                    <View
                        style={[
                            styles.markerRing,
                            { borderColor: primaryColor },
                        ]}
                    />
                )}

                {/* Corpo do pino */}
                <View
                    style={[
                        isSelected ? styles.markerPin : styles.markerPinSmall,
                        {
                            backgroundColor: isSelected ? primaryColor : surfaceColor,
                            borderColor: primaryColor,
                        },
                    ]}
                >
                    {flagSource ? (
                        <Image
                            source={flagSource}
                            style={isSelected ? styles.flagImage : styles.flagImageSmall}
                        />
                    ) : (
                        <MaterialCommunityIcons
                            name="gas-station"
                            size={isSelected ? 20 : 16}
                            color={isSelected ? '#FFF' : primaryColor}
                        />
                    )}
                </View>

                {/* Cauda triangular abaixo do pino (somente quando selecionado) */}
                {isSelected && (
                    <View
                        style={[
                            styles.markerTail,
                            { borderTopColor: primaryColor },
                        ]}
                    />
                )}
            </View>
        </Marker>
    );
});

PostoMarker.displayName = 'PostoMarker';

// ---------------------------------------------------------------------------
// Componente principal do mapa
// ---------------------------------------------------------------------------
export default function Map({
    postos,
    initialRegion,
    targetRegion,
    recenterToken,
    selectedPostoId,
    onSelectPosto,
    onMapPress,
}: MapProps) {
    const { colors, isDark } = useAppTheme();
    const mapRef = useRef<MapView | null>(null);
    const [tracksViewChanges, setTracksViewChanges] = useState(Platform.OS === 'android');

    useEffect(() => {
        if (!mapRef.current || !targetRegion || recenterToken === undefined) return;
        mapRef.current.animateToRegion(targetRegion, 350);
    }, [recenterToken, targetRegion]);

    useEffect(() => {
        if (Platform.OS !== 'android') return;

        setTracksViewChanges(true);
        const timer = setTimeout(() => setTracksViewChanges(false), 350);

        return () => clearTimeout(timer);
    }, [postos, selectedPostoId]);

    // Callback estavel — evita que PostoMarker receba nova referencia a cada render
    const handleSelectPosto = useCallback(
        (posto: PostoProps) => onSelectPosto(posto),
        [onSelectPosto]
    );

    return (
        <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={initialRegion}
            customMapStyle={isDark ? darkMapStyle : []}
            showsUserLocation={true}
            showsMyLocationButton={false}
            toolbarEnabled={false}
            moveOnMarkerPress={false}
            onPress={onMapPress}
        >
            {postos.map((posto) => (
                <PostoMarker
                    key={posto.id}
                    posto={posto}
                    isSelected={selectedPostoId === posto.id}
                    primaryColor={colors.primary}
                    surfaceColor={colors.surface}
                    onPress={handleSelectPosto}
                    tracksViewChanges={Platform.OS === 'android' ? tracksViewChanges : selectedPostoId === posto.id}
                />
            ))}
        </MapView>
    );
}
