import React, { memo, useCallback, useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import Mapbox from '@rnmapbox/maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { PostoProps } from '../PostoCard';
import { dicionarioBandeiras } from '../../utils/dictFlags';
import { styles } from './styles';

interface PostoMarkerProps {
    posto: PostoProps;
    isSelected: boolean;
    primaryColor: string;
    surfaceColor: string;
    onPress: (posto: PostoProps) => void;
}

const PostoMarker = memo(({
    posto,
    isSelected,
    primaryColor,
    surfaceColor,
    onPress,
}: PostoMarkerProps) => {
    const [renderVersion, setRenderVersion] = useState(0);
    const normalizedBandeira = posto.bandeira?.trim().toLowerCase();
    const isWhiteFlag = normalizedBandeira === 'bandeira branca' || normalizedBandeira === 'branca';
    const flagSource = !isWhiteFlag ? dicionarioBandeiras[posto.bandeira] : undefined;

    const handlePress = useCallback(() => {
        onPress(posto);
    }, [posto, onPress]);

    useEffect(() => {
        const timer = setTimeout(() => setRenderVersion((version) => version + 1), 50);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Mapbox.PointAnnotation
            id={posto.id}
            coordinate={[Number(posto.longitude), Number(posto.latitude)]}
            anchor={{ x: 0.5, y: 0.5 }}
            onSelected={handlePress}
            key={`${posto.id}-${isSelected}-${renderVersion}`}
        >
            <View
                style={[
                    styles.markerCore,
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
                        style={isSelected ? styles.flagImage : styles.flagImageSmall}
                    />
                ) : (
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons
                            name="gas-station"
                            size={isSelected ? 32 : 24}
                            color={isSelected ? surfaceColor : primaryColor}
                        />
                    </View>
                )}
            </View>
        </Mapbox.PointAnnotation>
    );
});

PostoMarker.displayName = 'PostoMarker';

export default PostoMarker;