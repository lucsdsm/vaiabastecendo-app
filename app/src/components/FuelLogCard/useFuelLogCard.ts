import { useAppTheme } from '../../theme/ThemeProvider';
import { FuelLog } from '../../database/logService';

export function useFuelLogCard(data: FuelLog & { km_per_liter: number | null }) {
    const { colors, isDark } = useAppTheme();

    const dateObj = new Date(data.date);
    const formattedDate = dateObj.toLocaleDateString('pt-BR', {
        day: '2-digit', 
        month: 'short', 
        year: 'numeric'
    });

    const formattedTotal = data.total_price.toFixed(2).replace('.', ',');
    const formattedLiters = data.liters.toFixed(2).replace('.', ',');
    const formattedPrice = data.price_per_liter.toFixed(2).replace('.', ',');
    const formattedOdometer = data.odometer.toLocaleString('pt-BR');

    const formattedKml = data.km_per_liter 
        ? `${data.km_per_liter.toFixed(2).replace('.', ',')} km/L` 
        : null;

    return {
        colors,
        isDark,
        formattedDate,
        formattedTotal,
        formattedLiters,
        formattedPrice,
        formattedOdometer,
        formattedKml
    };
}