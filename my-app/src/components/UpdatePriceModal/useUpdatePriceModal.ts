import { useEffect, useState } from 'react';

import axios from 'axios';
import { useCombustivel } from '../../contexts/CombustivelContext';
import { useToast } from '../../contexts/ToastContext';
import { useAuth } from '../../contexts/AuthContext';

export interface PrecoAtualResumo {
    tipo: string;
    preco: number;
}

interface UseUpdatePriceModalParams {
    visible: boolean;
    postoId: string;
    precosAtuais: PrecoAtualResumo[];
    onClose: () => void;
    onSuccess: () => void;
}

/**
 * Gerencia selecao de combustivel, validacao de preco e envio de atualizacao.
 */
export function useUpdatePriceModal({
    visible,
    postoId,
    precosAtuais,
    onClose,
    onSuccess,
}: UseUpdatePriceModalParams) {
    const { token } = useAuth();
    const { showToast } = useToast();
    const { fuelTypes } = useCombustivel();
    const [selectedFuel, setSelectedFuel] = useState<number | null>(null);
    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (visible) {
            setPrice('');
            if (fuelTypes.length > 0 &&!selectedFuel) {
                setSelectedFuel(fuelTypes[0].id);
            }
        }
    }, [visible, fuelTypes]);

    const normalizePriceInput = (text: string) => {
        const digitsOnly = text.replace(/\D/g, '');

        if (!digitsOnly) {
            return '';
        }

        const padded = digitsOnly.padStart(3, '0');
        const integerPartRaw = padded.slice(0, -2);
        const decimalPart = padded.slice(-2);

        const integerPart = integerPartRaw.replace(/^0+(?=\d)/, '');
        const withThousands = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        return `${withThousands},${decimalPart}`;
    };

    const parsePriceToNumber = (formattedPrice: string) => {
        const normalized = normalizePriceInput(formattedPrice);
        const numericString = normalized.replace(/\./g, '').replace(',', '.');
        return Number.parseFloat(numericString);
    };

    const handlePriceChange = (text: string) => {
        setPrice(normalizePriceInput(text));
    };

    const handleUpdate = async (fuelId: number | null, fuelPrice: string) => {
        if (!fuelId || !fuelPrice) {
            showToast('Selecione o combustível e informe um preço.', 'danger');
            return;
        }

        const numericPrice = parsePriceToNumber(fuelPrice);
        if (Number.isNaN(numericPrice) || numericPrice <= 0) {
            showToast('Informe um preço válido maior que zero.', 'danger');
            return;
        }

        // --- INÍCIO DAS TRAVAS DE SEGURANÇA ---
        
        // Trava 1: Valores irreais de mercado (Abaixo de 1 real ou acima de 15)
        if (numericPrice < 1 || numericPrice > 15) {
            showToast('Informe um preço real de mercado (entre R$ 1,00 e R$ 15,00).', 'info');
            return;
        }

        // Trava 2: Variação de 30%
        // A Ponte: Descobrimos o NOME do combustível usando o ID selecionado
        const combustivelSelecionado = fuelTypes.find(f => f.id === fuelId);
        
        if (combustivelSelecionado && precosAtuais) {
            // Agora procuramos na lista de preços atuais usando o NOME
            const precoAnteriorObj = precosAtuais.find(p => p.tipo === combustivelSelecionado.nome);

            if (precoAnteriorObj) {
                const precoAnterior = precoAnteriorObj.preco;
                const limiteSuperior = precoAnterior * 1.30;
                const limiteInferior = precoAnterior * 0.70;

                if (numericPrice > limiteSuperior || numericPrice < limiteInferior) {
                    showToast(`Valor suspeito. O preço atual é R$ ${precoAnterior.toFixed(2)}.`, 'info');
                    return; // Bloqueia a requisição aqui
                }
            }
        }
        // --- FIM DAS TRAVAS ---

        setLoading(true);
        try {
            await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/atualizar-preco/`, {
                posto: postoId,
                tipo_combustivel: fuelId,
                preco: numericPrice,
            }, {
                headers: token ? { Authorization: `Token ${token}` } : {}
            });

            setPrice('');
            onSuccess();
            onClose();
            showToast('Preço atualizado com sucesso!', 'success');
        } catch (error: any) {
            console.error('Erro da API:', error.response?.data || error.message);
            
            const erroBackend = error.response?.data;
            if (erroBackend && erroBackend.preco) {
                showToast(erroBackend.preco[0], 'danger');
            } else if (error.response?.status === 401 || error.response?.status === 403) {
                showToast('Sessão expirada. Faça login novamente.', 'danger');
            } else {
                showToast('Não foi possível atualizar o preço. Tente novamente.', 'danger');
            }
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
