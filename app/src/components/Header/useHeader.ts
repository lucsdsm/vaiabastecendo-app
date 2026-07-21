import { useEffect, useMemo, useState } from 'react';
import * as Location from 'expo-location';

import { useAuth } from '../../contexts/AuthContext';
import { useAppTheme } from '../../theme/ThemeProvider';

export function useHeader() {
    const { colors, toggleTheme, isDark } = useAppTheme();
    const { user } = useAuth();

    const displayName = user?.first_name || 'Motorista';
    const [locationName, setLocationName] = useState('Buscando...');

    const greeting = useMemo(() => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Bom dia';
        if (hour < 18) return 'Boa tarde';
        return 'Boa noite';
    }, []);

    useEffect(() => {
        let isMounted = true;

        async function fetchCityName() {
            try {
                // 1. tenta pegar a última posição conhecida (mais rápido e evita travar o emulador)
                let location = await Location.getLastKnownPositionAsync({});

                // 2. se não houver posição recente, força a busca da posição atual com timeout
                if (!location) {
                    location = await Location.getCurrentPositionAsync({
                        accuracy: Location.Accuracy.Balanced,
                    });
                }

                if (!isMounted) {
                    return;
                }

                if (!location) {
                    setLocationName('Desconhecido');
                    return;
                }

                const [address] = await Location.reverseGeocodeAsync({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });

                if (!isMounted) {
                    return;
                }

                if (!address) {
                    setLocationName('Localização não encontrada');
                    return;
                }

                const city = address.subregion || address.city || 'Local desconhecido';
                const neighborhood = address.district || '';

                const formattedLocation = [neighborhood, city].filter(Boolean).join(', ');
                setLocationName(`${formattedLocation}.`);
            } catch (error) {
                console.error('Erro ao fazer o reverse geocode:', error);

                if (isMounted) {
                    setLocationName('Desconhecido');
                }
            }
        }

        fetchCityName();

        return () => {
            isMounted = false;
        };
    }, []);

    return {
        colors,
        isDark,
        toggleTheme,
        displayName,
        greeting,
        locationName,
    };
}