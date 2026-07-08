import { useState, useEffect, useMemo } from 'react';
import * as Location from 'expo-location';

import { useAuth } from '../../contexts/AuthContext';
import { useAppTheme } from '../../theme/ThemeProvider';

export function useHeader() {
    const { colors, toggleTheme, isDark } = useAppTheme();
    const { userData } = useAuth();
    
    const displayName = userData?.primeiro_nome || 'Motorista';
    const [locationName, setLocationName] = useState('Buscando...');

    const greeting = useMemo(() => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Bom dia';
        if (hour < 18) return 'Boa tarde';
        return 'Boa noite';
    }, []);

    useEffect(() => {
    async function fetchCityName() {
        try {
            // 1. tenta pegar a ultima localização conhecida (mais rápido e evita travar o emulador)
            let location = await Location.getLastKnownPositionAsync({});

            // 2. se nao houver posição recente, força a busca da posicao atual com timeout
            if (!location) {
                location = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.Balanced,
                });
            }

            if (location) {
                const [address] = await Location.reverseGeocodeAsync({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });

                if (address) {
                    const city = address.subregion || address.city || 'Local desconhecido';
                    const neighborhood = address.district || '';

                    const formattedLocation = [
                        neighborhood,
                        city,
                    ].filter(Boolean).join(', ');
                    setLocationName(formattedLocation + '.');
                } else {
                    setLocationName('Localização não encontrada');
                }
            } else {
                setLocationName('Desconhecido');
            }
        } catch (error) {
            console.error("Erro ao fazer o reverse geocode:", error);
            setLocationName('Desconhecido');
        }
    }

    fetchCityName();
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