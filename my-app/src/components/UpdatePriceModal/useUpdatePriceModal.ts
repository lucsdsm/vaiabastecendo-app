import { useEffect, useState } from 'react';

import axios from 'axios';
import { useToast } from '../../contexts/ToastContext';

interface FuelType {
    id: number;
    nome: string;
    cor: string;
}

interface UseUpdatePriceModalParams {
    visible: boolean;
    postoId: string;
    onClose: () => void;
    onSuccess: () => void;
}

/**
 * Gerencia selecao de combustivel, validacao de preco e envio de atualizacao.
 */
export function useUpdatePriceModal({
    visible,
    postoId,
    onClose,
    onSuccess,
}: UseUpdatePriceModalParams) {
    const { showToast } = useToast();
    const [fuelTypes, setFuelTypes] = useState<FuelType[]>([]);
    const [selectedFuel, setSelectedFuel] = useState<number | null>(null);
    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (visible) {
            fetchFuelTypes();
        }
    }, [visible]);

    const fetchFuelTypes = async () => {
        try {
            const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/tipos-combustivel/`);
            const list = Array.isArray(response.data) ? response.data : [];
            setFuelTypes(list);
            if (list.length > 0) {
                setSelectedFuel(list[0].id);
            }
        } catch (error) {
            console.error('Erro ao buscar tipos de combustivel', error);
        }
    };

    const handlePriceChange = (text: string) => {
        let cleaned = text.replace(/[^0-9.,]/g, '');
        cleaned = cleaned.replace('.', ',');

        const parts = cleaned.split(',');
        if (parts.length > 2) {
            cleaned = `${parts[0]},${parts.slice(1).join('')}`;
        }

        if (cleaned.includes(',')) {
            const [int, dec] = cleaned.split(',');
            cleaned = `${int},${dec.substring(0, 2)}`;
        }

        setPrice(cleaned);
    };

    const handleUpdate = async (fuelId: number | null, fuelPrice: string) => {
        if (!fuelId || !fuelPrice) {
            showToast('Selecione o combustível e informe um preço.', 'danger');
            return;
        }

        const numericPrice = parseFloat(fuelPrice.replace(',', '.'));
        if (Number.isNaN(numericPrice) || numericPrice <= 0) {
            showToast('Informe um preço válido maior que zero.', 'danger');
            return;
        }

        setLoading(true);
        try {
            await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/atualizar-preco/`, {
                posto: postoId,
                tipo_combustivel: fuelId,
                preco: numericPrice,
            });

            setPrice('');
            onSuccess();
            onClose();
            showToast('Preço atualizado com sucesso!', 'success');
        } catch (error: any) {
            console.error('Erro da API:', error.response?.data || error.message);
            showToast('Não foi possível atualizar o preço. Tente novamente.', 'danger');
        } finally {
            setLoading(false);
        }
    };

    return {
        fuelTypes,
        selectedFuel,
        price,
        loading,
        setSelectedFuel,
        handlePriceChange,
        handleUpdate,
    };
}
