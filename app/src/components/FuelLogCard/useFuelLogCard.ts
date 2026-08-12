import { useAppTheme } from '@theme/ThemeProvider';
import { getReadableColor } from '@utils/color';
import { useFuelTypes } from '@contexts/FuelTypesContext'; 

export function useFuelLogCard(data: any) {
    const { colors, isDark } = useAppTheme();
    
    const { fuelTypes } = useFuelTypes();

    const fuelInfo = fuelTypes.find(f => f.name === data.fuel_type);
    const baseColor = fuelInfo?.color || colors.primary; 
    const accentColor = getReadableColor(baseColor, isDark);

    const dateObj = new Date(data.date);
    const formattedDate = dateObj.toLocaleDateString('pt-BR', {
        day: '2-digit', month: 'short', year: 'numeric'
    });

    const formattedTotal = data.total_price.toFixed(2).replace('.', ',');
    const formattedLiters = data.liters.toFixed(2).replace('.', ',');
    const formattedPrice = data.price_per_liter.toFixed(2).replace('.', ',');
    const formattedOdometer = data.odometer.toLocaleString('pt-BR');
    
    const formattedKml = data.km_per_liter 
        ? `${data.km_per_liter.toFixed(1).replace('.', ',')} km/l` : null;
        
    const formattedDistance = data.distance_driven 
        ? `+${data.distance_driven.toLocaleString('pt-BR')} km` : null;
        
    const formattedCostPerKm = data.cost_per_km 
        ? `R$ ${data.cost_per_km.toFixed(2).replace('.', ',')}/km` : null;

    return {
        colors,
        isDark,
        accentColor, 
        formattedDate,
        formattedTotal,
        formattedLiters,
        formattedPrice,
        formattedOdometer,
        formattedKml,
        formattedDistance, 
        formattedCostPerKm 
    };
}