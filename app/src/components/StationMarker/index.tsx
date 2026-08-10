import React, { memo, useCallback, useEffect, useState } from 'react';
import { Image, View } from 'react-native';

import Mapbox from '@rnmapbox/maps';

import { StationCardProps } from '../StationCard';

import { flagsDictionary } from '@utils/flagsDictionary';

import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

import { styles } from './styles';

interface StationMarkerProps {
    station: StationCardProps;
    isSelected: boolean;
    primaryColor: string;
    surfaceColor: string;
    onPress: (station: StationCardProps) => void;
}

const StationMarker = memo(({
    station,
    isSelected,
    primaryColor,
    surfaceColor,
    onPress,
}: StationMarkerProps) => {
    const [renderVersion, setRenderVersion] = useState(0);

    const handlePress = useCallback(() => {
        if (station) {
            onPress(station);
        }
    }, [station, onPress]);

    useEffect(() => {
        const timer = setTimeout(() => setRenderVersion((version) => version + 1), 50);
        return () => clearTimeout(timer);
    }, []);

    if (!station) {
        return null;
    }

    const normalizedBrand = station.brand?.trim().toLowerCase();
    const isWhiteFlag = normalizedBrand === 'bandeira branca' || normalizedBrand === 'branca';
    const flagSource = !isWhiteFlag ? flagsDictionary[station.brand] : undefined;

    return (
        <Mapbox.PointAnnotation
            id={station.id}
            coordinate={[Number(station.longitude), Number(station.latitude)]}
            anchor={{ x: 0.5, y: 0.5 }}
            onSelected={handlePress}
            key={`${station.id}-${isSelected}-${renderVersion}`}>
            
            <View style={[
                    styles.marker,
                    {
                        width: isSelected ? 64 : 48,
                        height: isSelected ? 64 : 48,
                        borderRadius: isSelected ? 32 : 24,
                        backgroundColor: isSelected ? primaryColor : surfaceColor,
                        borderColor: primaryColor,
                        borderWidth: isSelected ? 0 : 2,
                        elevation: isSelected ? 6 : 3,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: isSelected ? 4 : 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: isSelected ? 6 : 4,
                    },
                ]}
            >
                {flagSource ? (
                    <Image
                        source={flagSource}
                        style={isSelected ? styles.image : styles.small}
                    />
                ) : (
                    <View style={styles.container}>
                        <FontAwesome6
                            name="gas-pump"
                            size={isSelected ? 32 : 24}
                            iconStyle='solid'
                            color={isSelected ? surfaceColor : primaryColor}
                        />
                    </View>
                )}
            </View>
        </Mapbox.PointAnnotation>
    );
});

StationMarker.displayName = 'StationMarker';

export default StationMarker;