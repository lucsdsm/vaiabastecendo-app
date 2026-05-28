import React, { useCallback, useEffect, useRef } from 'react';
import { View } from 'react-native';
import Mapbox from '@rnmapbox/maps';

import { useAppTheme } from '../../theme/ThemeProvider';
import { PostoProps } from '../PostoCard';
import PostoMarker from '../PostoMarker';
import { styles } from './styles';

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN ?? '');

interface MapProps {
    postos: PostoProps[];
    initialRegion: any;
    targetRegion?: any | null;
    recenterToken?: number;
    selectedPostoId?: string | null;
    onSelectPosto: (posto: PostoProps) => void;
    onMapPress: () => void;
}

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
    const cameraRef = useRef<Mapbox.Camera>(null);

    const mapStyle = isDark ? Mapbox.StyleURL.Dark : Mapbox.StyleURL.Street;

    useEffect(() => {
        if (!cameraRef.current || !targetRegion || recenterToken === undefined) return;
        
        cameraRef.current.setCamera({
            centerCoordinate: [targetRegion.longitude, targetRegion.latitude],
            zoomLevel: 15,
            animationDuration: 350,
        });
    }, [recenterToken, targetRegion]);

    const handleSelectPosto = useCallback(
        (posto: PostoProps) => {
            onSelectPosto(posto);
            cameraRef.current?.setCamera({
                centerCoordinate: [Number(posto.longitude), Number(posto.latitude)],
                zoomLevel: 16,
                animationDuration: 350,
            });
        },
        [onSelectPosto]
    );

    return (
        <View style={styles.map}>
            <Mapbox.MapView
                style={styles.map}
                styleURL={mapStyle}
                onPress={onMapPress}
                logoEnabled={false}
                compassEnabled={false}
                attributionEnabled={false} 
                scaleBarEnabled={false}
            >
                <Mapbox.Camera
                    ref={cameraRef}
                    zoomLevel={13}
                    centerCoordinate={[initialRegion.longitude, initialRegion.latitude]}
                    animationMode="flyTo"
                    animationDuration={0}
                />

                <Mapbox.UserLocation 
                    visible={true} 
                    showsUserHeadingIndicator={true}
                />

                {postos.map((posto) => (
                    <PostoMarker
                        key={posto.id}
                        posto={posto}
                        isSelected={selectedPostoId === posto.id}
                        primaryColor={colors.primary}
                        surfaceColor={colors.surface}
                        onPress={handleSelectPosto}
                    />
                ))}
            </Mapbox.MapView>
        </View>
    );
}