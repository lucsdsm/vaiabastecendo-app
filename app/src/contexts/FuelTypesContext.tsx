import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

export interface FuelType {
  id: number;
  name: string;
  color: string;
}

interface FuelTypeContextValue {
  fuelTypes: FuelType[];
  isLoading: boolean;
  refreshFuelTypes: () => Promise<void>;
}

const FuelTypeContext = createContext<FuelTypeContextValue | undefined>(undefined);

/**
 * Provedor global dos tipos de combustível.
 * Busca e disponibiliza os metadados necessários para toda a aplicação.
 */
export function FuelTypeProvider({ children }: { children: React.ReactNode }) {
  const [fuelTypes, setFuelTypes] = useState<FuelType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshFuelTypes = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/fuel-types/`);
      const rawList = Array.isArray(response.data) ? response.data : [];

      const normalizedFuelTypes: FuelType[] = rawList.map((item) => ({
        id: item.id,
        name: item.name,
        color: item.color,
      }));

      setFuelTypes(normalizedFuelTypes);
    } catch (error) {
      console.error('Falha ao buscar os tipos de combustível:', error);
      setFuelTypes([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshFuelTypes();
  }, [refreshFuelTypes]);

  const value = useMemo(
    () => ({
      fuelTypes,
      isLoading,
      refreshFuelTypes,
    }),
    [fuelTypes, isLoading, refreshFuelTypes]
  );

  return (
    <FuelTypeContext.Provider value={value}>
      {children}
    </FuelTypeContext.Provider>
  );
}

/**
 * Hook de acesso seguro ao contexto dos tipos de combustível.
 */
export function useFuelTypes() {
  const context = useContext(FuelTypeContext);

  if (!context) {
    throw new Error('useFuelTypes deve ser usado dentro de um FuelTypeProvider.');
  }

  return context;
}