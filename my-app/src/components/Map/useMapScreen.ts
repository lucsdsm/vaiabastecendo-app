import { useCallback, useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as Location from 'expo-location';
import { useAppTheme } from '../../theme/ThemeProvider';
import { PostoProps } from '../../components/PostoCard';
import { usePostos } from '../../hooks/usePostos';

export function useMapScreen() {
    const { colors, isDark } = useAppTheme();
    const { postos, refetch } = usePostos();
    const [selectedPosto, setSelectedPosto] = useState<PostoProps | null>(null);
    const [userRegion, setUserRegion] = useState<{
        latitude: number;
        longitude: number;
        latitudeDelta: number;
        longitudeDelta: number;
    } | null>(null);
    const [recenterToken, setRecenterToken] = useState(0);

    // Coordenadas iniciais (Você pode puxar a localização atual do dispositivo depois)
    const initialRegion = {
        latitude: -5.79448,
        longitude: -35.2110,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    };

    const handleSelectPosto = (posto: PostoProps) => {
        setSelectedPosto(posto);
    };

    const handleCloseCard = () => {
        setSelectedPosto(null);
    };

    // Solicita permissão e obtém a localização do usuário quando a tela é focada
    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permissão de localização negada pelo usuário');
                // Aqui você poderia usar o seu Toast para avisar o usuário
            }
        })();
    }, []);

    useFocusEffect(
        useCallback(() => {
            let isActive = true;

            const resolveUserRegion = async () => {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    return;
                }

                let location = await Location.getLastKnownPositionAsync({});

                if (!location) {
                    location = await Location.getCurrentPositionAsync({
                        accuracy: Location.Accuracy.Balanced,
                    });
                }

                if (!location || !isActive) {
                    return;
                }

                setUserRegion({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                });
                setRecenterToken((value) => value + 1);
            };

            resolveUserRegion();

            return () => {
                isActive = false;
            };
        }, [])
    );

    return {
        colors,
        isDark,
        postos,
        initialRegion,
        userRegion,
        recenterToken,
        selectedPosto,
        handleSelectPosto,
        handleCloseCard,
        refetch,
    };
}