import { useCallback, useEffect, useMemo, useState } from 'react';

import axios from 'axios';

import { FuelType, useFuelTypes } from '@contexts/FuelTypesContext';

import { useToast } from '@contexts/ToastContext';

import { useAuth } from '@contexts/AuthContext';

export interface PrecoAtualResumo {
    type: string;
    price: number;
}

interface UseUpdatePriceCardParams {
    stationId: string;
    currentPrices: PrecoAtualResumo[];
    onSuccess: () => void;
}

/**
 * Gerencia selecao de combustivel, validacao de preco e envio de atualizacao.
 */
export function useUpdatePriceCard({
    stationId,
    currentPrices,
    onSuccess,
}: UseUpdatePriceCardParams) {
    const { token } = useAuth();
    const { showToast } = useToast();
    const { fuelTypes, refreshFuelTypes, isLoading: isFuelLoading } = useFuelTypes();

    const [selectedFuel, setSelectedFuel] = useState<number | null>(null);
    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setPrice('');
        setSelectedFuel(null);

        if (fuelTypes.length === 0 && !isFuelLoading) {
            refreshFuelTypes();
        }
    }, [stationId, fuelTypes.length, isFuelLoading, refreshFuelTypes]);

    useEffect(() => {
        if (fuelTypes.length > 0 && !selectedFuel) {
            setSelectedFuel(fuelTypes[0].id);
        }
    }, [fuelTypes, selectedFuel]);

    const fuelTypeRows = useMemo(() => {
        const rows: FuelType[][] = [];
        for (let i = 0; i < fuelTypes.length; i += 3) {
            rows.push(fuelTypes.slice(i, i + 3));
        }
        return rows;
    }, [fuelTypes]);

    const normalizePriceInput = useCallback((text: string) => {
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
    }, []);

    const parsePriceToNumber = useCallback(
        (formattedPrice: string) => {
            const normalized = normalizePriceInput(formattedPrice);
            const numericString = normalized.replace(/\./g, '').replace(',', '.');
            return Number.parseFloat(numericString);
        },
        [normalizePriceInput]
    );

    const handlePriceChange = useCallback(
        (text: string) => {
            setPrice(normalizePriceInput(text));
        },
        [normalizePriceInput]
    );

    const handleUpdate = useCallback(
        async (fuelId: number | null, fuelPrice: string) => {
            if (!fuelId || !fuelPrice) {
                showToast('Selecione o combustível e informe um preço.', {
                    title: 'Campos obrigatórios',
                    type: 'danger',
                });
                return;
            }

            const numericPrice = parsePriceToNumber(fuelPrice);
            if (Number.isNaN(numericPrice) || numericPrice <= 0) {
                showToast('Informe um preço válido maior que zero.', {
                    title: 'Preço inválido',
                    type: 'danger',
                });
                return;
            }

            if (numericPrice < 1 || numericPrice > 15) {
                showToast('Informe um preço real de mercado (entre R$ 1,00 e R$ 15,00).', {
                    title: 'Preço fora do intervalo',
                    type: 'info',
                });
                return;
            }

            const selectedFuel = fuelTypes.find((f) => f.id === fuelId);

            if (selectedFuel && currentPrices) {
                const precoAnteriorObj = currentPrices.find(
                    (p) => p.type === selectedFuel.name
                );

                if (precoAnteriorObj) {
                    const precoAnterior = precoAnteriorObj.price;
                    const limiteSuperior = precoAnterior * 1.3;
                    const limiteInferior = precoAnterior * 0.7;

                    if (numericPrice > limiteSuperior || numericPrice < limiteInferior) {
                        showToast(`Valor suspeito. O preço atual é R$ ${precoAnterior.toFixed(2)}.`, {
                            title: 'Preço suspeito',
                            type: 'info',
                        });
                        return;
                    }
                }
            }

            setLoading(true);
            try {
                await axios.post(
                    `${process.env.EXPO_PUBLIC_API_URL}/price-updates/`,
                    {
                        station: stationId,
                        fuel_type: fuelId,
                        price: numericPrice,
                    },
                    {
                        headers: token ? { Authorization: `Token ${token}` } : {},
                    }
                );

                setPrice('');
                onSuccess();
                showToast('Preço atualizado com sucesso!', {
                    title: 'Sucesso',
                    type: 'success',
                });
            } catch (error: any) {
                console.error('Erro da API:', error.response?.data || error.message);

                const erroBackend = error.response?.data;
                if (erroBackend?.preco) {
                    showToast(erroBackend.preco[0], {
                        title: 'Erro ao atualizar preço',
                        type: 'danger',
                    });
                } else if (error.response?.status === 401 || error.response?.status === 403) {
                    showToast('Sessão expirada. Faça login novamente.', {
                        title: 'Erro de autenticação',
                        type: 'danger',
                    });
                } else {
                    showToast('Não foi possível atualizar o preço. Tente novamente.', {
                        title: 'Erro de atualização',
                        type: 'danger',
                    });
                }
            } finally {
                setLoading(false);
            }
        },
        [fuelTypes, currentPrices, stationId, token, showToast, onSuccess, parsePriceToNumber]
    );

    return {
        fuelTypes,
        fuelTypeRows,
        selectedFuel,
        price,
        loading,
        setSelectedFuel,
        handlePriceChange,
        handleUpdate,
        parsePriceToNumber,
    };
}