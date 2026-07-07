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
                const { coords } = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.Balanced,
                });

                const [address] = await Location.reverseGeocodeAsync({
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                });

                if (address) {
                    const city = address.subregion || address.city || 'Local desconhecido';
                    const state = address.region || '';
                    
                    setLocationName(`${city}${state ? `, ${state}` : ''}`);
                } else {
                    setLocationName('Localização não encontrada');
                }
            } catch (error) {
                console.error("Erro ao fazer o reverse geocode:", error);
                setLocationName('Erro ao buscar local');
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