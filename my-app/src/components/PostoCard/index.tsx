import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { useAppTheme } from '../../theme/ThemeProvider';
import { Feather } from '@expo/vector-icons';

export interface PostoProps {
    id: string;
    nome: string;
    distancia: string;
    precoGasolina: number;
    precoEtanol: number;
    ultimaAtualizacao: string;
    likes: number;
}

export default function PostoCard({ data }: { data: PostoProps }) {
    const { colors, isDark } = useAppTheme();

    // Estado local para controle de curtida (true se curtiu, false caso contrário).
    const [isLiked, setIsLiked] = useState(false);

    // Função para alternar o estado de curtida ao pressionar o botão de like.
    const handleLike = () => {
        setIsLiked(!isLiked);
    };

    return (
        <View style={[styles.container, {
            backgroundColor: colors.surface,
            borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'
        }]}>
            {/* Cabeçalho do Cartão: Nome e Distância */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={[styles.title, { color: colors.textPrimary }]} numberOfLines={1}>
                        {data.nome}
                    </Text>
                    <View style={styles.distanceBadge}>
                        <Feather name="map-pin" size={10} color={colors.textSecondary} />
                        <Text style={[styles.distanceText, { color: colors.textSecondary }]}>
                            {data.distancia}
                        </Text>
                    </View>
                </View>

                {/* Botão de Curtida */}
                <TouchableOpacity
                    style={[styles.likeButton, {
                        backgroundColor: isLiked 
                            ? colors.danger + (isDark ? '33' : '1A')
                            : colors.surface + (isDark ? '1F' : '0D')
                    }]}
                    onPress={handleLike}
                    activeOpacity={0.7}
                >
                    <Feather
                        name={isLiked ? "heart" : "heart"}
                        size={16}
                        color={isLiked ? colors.danger : colors.textSecondary}
                        style={{ fill: isLiked ? colors.danger : 'transparent' }}
                    />
                    <Text style={[
                        styles.likeCount,
                        { color: isLiked ? colors.danger : colors.textSecondary }
                    ]}>
                        {data.likes + (isLiked ? 1 : 0)}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Corpo: Preços ou Alerta */}
            <View style={styles.priceContainer}>
                {data.precoGasolina > 0 || data.precoEtanol > 0 ? (
                    <>
                        <View style={styles.priceBlock}>
                            <View style={[styles.priceBadge, { backgroundColor: colors.gasolinaComum + (isDark ? '1A' : '0D') }]}>
                                <Text style={[styles.fuelLabel, { color: colors.textSecondary }]}>Gasolina</Text>
                                <Text style={[styles.priceValue, { color: colors.gasolinaComum }]}>
                                    {data.precoGasolina.toFixed(2)}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.priceBlock}>
                            <View style={[styles.priceBadge, { backgroundColor: colors.etanol + (isDark ? '1A' : '0D') }]}>
                                <Text style={[styles.fuelLabel, { color: colors.textSecondary }]}>Etanol</Text>
                                <Text style={[styles.priceValue, { color: colors.etanol }]}>
                                    {data.precoEtanol.toFixed(2)}
                                </Text> 
                            </View>
                        </View>
                    </>
                ) : (
                    <View style={[styles.noPriceContainer, { 
                        backgroundColor: colors.primary + (isDark ? '1A' : '0D'),
                        borderColor: colors.primary + '40'
                    }]}>
                        <Feather name="info" size={18} color={colors.primary} />
                        <Text style={[styles.noPriceText, { color: colors.textPrimary }]}>
                            Este posto ainda não foi precificado. Seja o primeiro a informar!
                        </Text>
                    </View>
                )}
            </View>

            {/* Rodapé: Tempo e Botão de Ação */}
            <View style={styles.footer}>
                <View style={styles.updateInfo}>
                    <Feather name="clock" size={10} color={colors.textSecondary} />
                    <Text style={[styles.timeText, { color: colors.textSecondary }]}>
                        {data.ultimaAtualizacao}
                    </Text>
                </View>

                <TouchableOpacity
                    style={[styles.updateButton, {
                        backgroundColor: colors.primary,
                        opacity: 0.9
                    }]}
                    activeOpacity={0.8}
                >
                    <Feather name="refresh-cw" size={12} color="#FFF" />
                    <Text style={styles.updateButtonText}>Atualizar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 20,
        padding: 20,
        marginBottom: 12,
        borderWidth: 1,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
        gap: 12,
    },
    headerLeft: {
        flex: 1,
        gap: 6,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: -0.3,
    },
    distanceBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    distanceText: {
        fontSize: 12,
        fontWeight: '500',
        letterSpacing: 0.2,
    },
    likeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
    },
    likeCount: {
        fontSize: 12,
        fontWeight: '600',
    },
    priceContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 20,
    },
    priceBlock: {
        flex: 1,
    },
    priceBadge: {
        borderRadius: 16,
        padding: 16,
        gap: 8,
    },
    noPriceContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderStyle: 'dashed',
        gap: 12,
    },
    noPriceText: {
        flex: 1,
        fontSize: 13,
        lineHeight: 18,
        fontWeight: '500',
    },
    fuelLabel: {
        fontSize: 11,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.8,
    },
    priceValue: {
        fontSize: 28,
        fontWeight: '800',
        letterSpacing: -0.5,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
    },
    updateInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        flex: 1,
    },
    timeText: {
        fontSize: 12,
        fontWeight: '500',
    },
    updateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 14,
        paddingVertical: 9,
        borderRadius: 12,
    },
    updateButtonText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 0.2,
    },
});
