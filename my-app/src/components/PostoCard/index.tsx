import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, Linking } from 'react-native';
import { useAppTheme } from '../../theme/ThemeProvider';
import { Feather } from '@expo/vector-icons';

import UpdatePriceModal from '../UpdatePriceModal';

export interface PrecoAtual {
    tipo: string;
    cor: string;
    preco: number;
    data: string;
}

/**
 * Estrutura de dados exibida no card de posto.
 */
export interface PostoProps {
    id: string;
    nome: string;
    latitude: number;
    longitude: number;
    distancia: string;
    endereco: string;
    precoGasolina: number;
    precoEtanol: number;
    ultimaAtualizacao: string;
    likes: number;
    precos_atuais: PrecoAtual[];
}

/**
 * Card de exibicao de preco e status de atualizacao do posto.
 */
export default function PostoCard({ data, onRefresh }: { data: PostoProps; onRefresh: () => void }) {
    const { colors, isDark } = useAppTheme();

    const [isLiked, setIsLiked] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);

    // Organiza os preços atuais em linhas de até 4 itens para exibição
    const priceRows = [] as PrecoAtual[][];
    if (data.precos_atuais && data.precos_atuais.length > 0) {
        for (let i = 0; i < data.precos_atuais.length; i += 4) {
            priceRows.push(data.precos_atuais.slice(i, i + 4));
        }
    }

    const handleLike = () => {
        setIsLiked(!isLiked);
    };

    const handleGetDirections = () => {
        const { latitude, longitude, nome } = data;

        const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&destination_place_id=${nome}`;

        Linking.openURL(url).catch(err => console.error('Erro ao abrir o mapa:', err));
    };

    return (
        <View style={[styles.container, {
            backgroundColor: colors.surface,
            borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'
        }]}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={[styles.title, { color: colors.textPrimary }]} numberOfLines={1}>
                        {data.nome}
                    </Text>
                    {/* NOVO: Exibição do Endereço */}
                    <Text style={[styles.addressText, { color: colors.textSecondary }]} numberOfLines={1}>
                        {data.endereco}
                    </Text>
                    <View style={styles.infoBadge}>
                        {/* distância */}
                        <Feather name="map-pin" size={10} color={colors.textSecondary} />
                        <Text style={[styles.distanceText, { color: colors.textSecondary }]}>
                            {data.distancia}
                        </Text>
                        
                        {/* hora e criador da última atualização */}
                        <Feather name="clock" size={10} color={colors.textSecondary} style={{ marginLeft: 8 }} />
                        <Text style={[styles.timeText, { color: colors.textSecondary }]}>
                            {data.ultimaAtualizacao}
                        </Text>
                    </View>
                    
                </View>

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

            <View style={styles.priceContainer}>
                {data.precos_atuais && data.precos_atuais.length > 0 ? (
                    priceRows.map((row, rowIndex) => (
                        <View key={rowIndex} style={styles.priceRow}>
                            {row.map((item, index) => (
                                <View key={`${rowIndex}-${index}`} style={styles.priceBlock}>
                                    <View style={[styles.priceBadge, { backgroundColor: item.cor + (isDark ? '1A' : '0D') }]}>
                                        <View style={styles.fuelLabelContainer}>
                                            <Text
                                                style={[styles.fuelLabel, { color: colors.textSecondary }]}
                                                numberOfLines={2}
                                                adjustsFontSizeToFit
                                                minimumFontScale={0.85}
                                                allowFontScaling={false}
                                                maxFontSizeMultiplier={1}
                                            >
                                                {item.tipo}
                                            </Text>
                                        </View>
                                        <Text style={[styles.priceValue, { color: item.cor }]}>
                                            {item.preco.toFixed(2)}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    ))
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

            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.directionsButton, { borderColor: colors.primary }]}
                    onPress={handleGetDirections}
                >
                    <Feather name="navigation" size={12} color={colors.primary} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.updateButton, {
                        backgroundColor: colors.primary,
                        opacity: 0.9
                    }]}
                    activeOpacity={0.8}
                    onPress={() => setModalVisible(true)}
                >
                    <Feather name="refresh-cw" size={12} color="#FFF" />
                    <Text style={styles.updateButtonText}>
                        Atualizar
                    </Text>
                </TouchableOpacity>
            </View>

            <UpdatePriceModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                postoId={data.id}
                postoNome={data.nome}
                onSuccess={() => {
                    setModalVisible(false);
                    onRefresh();            
                }}
            />
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
    addressText: {
        fontSize: 12,
        fontWeight: '400',
        marginTop: -2,
        marginBottom: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: -0.3,
    },
    infoBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    distanceText: {
        fontSize: 12,
        fontWeight: '500',
        letterSpacing: 0.2,
    },
        timeText: {
        fontSize: 12,
        fontWeight: '500',
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
        gap: 12,
        marginBottom: 20,
    },
    priceRow: {
        flexDirection: 'row',
        gap: 12,
    },
    priceBlock: {
        flex: 1,
    },
    priceBadge: {
        borderRadius: 16,
        padding: 16,
        minHeight: 112,
        justifyContent: 'space-between',
        gap: 8,
    },
    fuelLabelContainer: {
        minHeight: 32,
        justifyContent: 'center',
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
        lineHeight: 14,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        textAlign: 'center',
        includeFontPadding: false,
    },
    priceValue: {
        fontSize: 28,
        fontWeight: '800',
        letterSpacing: -0.5,
        textAlign: 'center',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
    },
    directionsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 9,
        borderRadius: 12,
        borderWidth: 1,
    },
    updateInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        flex: 1,
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
