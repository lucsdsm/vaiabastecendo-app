import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

interface FuelType {
    id: number;
    nome: string;
    cor: string;
}

interface CombustivelContextData {
    fuelTypes: FuelType[];
    loading: boolean;
}

const CombustivelContext = createContext<CombustivelContextData>({} as CombustivelContextData);

/**
 * Provedor global dos tipos de combustivel.
 * Busca e disponibiliza os tipos para toda a arvore de componentes.
 */
export const CombustivelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [fuelTypes, setFuelTypes] = useState<FuelType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFuelTypes = async () => {
            try {
                const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/tipos-combustivel/`);
                // A API pode retornar payload inesperado; garantimos array para nao quebrar a UI.
                const list = Array.isArray(response.data) ? response.data : [];
                setFuelTypes(list);
            } catch (error) {
                console.error("Erro ao buscar tipos de combustível:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFuelTypes();
    }, []);

    return (
        <CombustivelContext.Provider value={{ fuelTypes, loading }}>
            {children}
        </CombustivelContext.Provider>
    );
};

/**
 * Hook de acesso aos tipos de combustivel carregados em memoria.
 * Deve ser usado dentro de CombustivelProvider.
 */
export const useCombustivel = () => useContext(CombustivelContext);