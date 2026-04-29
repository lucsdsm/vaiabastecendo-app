import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import UpdatePriceModal from '../UpdatePriceModal';
import { styles } from './styles';
import { PostoProps, usePostoCard } from './usePostoCard';

export type { PostoProps, PrecoAtual } from './usePostoCard';

/**
 * Card de exibicao de preco e status de atualizacao do posto.
 */
export default function PostoCard({ data, onRefresh }: { data: PostoProps; onRefresh: () => void }) {
    const {
        colors,
        isDark,
        modalVisible,
        priceRows,
        isLoggedIn,
        closeModal,
        handleGetDirections,
        toggleLike,
        handleOpenUpdateModal,
    } = usePostoCard(data);

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
                    <Text style={[styles.addressText, { color: colors.textSecondary }]} numberOfLines={1}>
                        {data.endereco}
                    </Text>
                    <View style={styles.infoBadge}>
                        <Feather name="map-pin" size={10} color={colors.textSecondary} />
                        <Text style={[styles.distanceText, { color: colors.textSecondary }]}>
                            {data.distancia}
                        </Text>

                        {data.precos_atuais && data.precos_atuais.length > 0 && (
                            <>
                                <Feather name="clock" size={10} color={colors.textSecondary} style={{ marginLeft: 8 }} />
                                <Text style={[styles.timeText, { color: colors.textSecondary }]}>
                                    {data.ultimaAtualizacao}
                                </Text>
                            </>
                        )}
                    </View>
                </View>
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
                                        
                                        <TouchableOpacity 
                                            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}
                                            onPress={() => toggleLike(item.id)}
                                            activeOpacity={0.7}
                                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                        >
                                            <Feather
                                                name="arrow-up-circle"
                                                size={14}
                                                color={item.is_liked ? colors.success : colors.textSecondary}
                                                style={{ fill: item.is_liked ? colors.success : 'transparent' }}
                                            />
                                            <Text style={[
                                                styles.likeCount, 
                                                { color: item.is_liked ? colors.success : colors.textSecondary, marginLeft: 4, fontSize: 12 }
                                            ]}>
                                                {item.likes}
                                            </Text>
                                        </TouchableOpacity>
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
                    style={[styles.directionsButton, { borderColor: colors.danger }]}
                    onPress={handleGetDirections}
                >
                    <Feather name="map-pin" size={12} color={colors.danger} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.updateButton, {
                        backgroundColor: isLoggedIn ? colors.primary : colors.textPrimary + (isDark ? '1A' : '4D'),
                    }]}
                    activeOpacity={0.8}
                    onPress={handleOpenUpdateModal}
                >
                    <Feather name="refresh-cw" size={12} color="#FFF" />
                    <Text style={styles.updateButtonText}>
                        Atualizar
                    </Text>
                </TouchableOpacity>
            </View>

            <UpdatePriceModal
                visible={modalVisible}
                onClose={closeModal}
                postoId={data.id}
                postoNome={data.nome}
                precosAtuais={data.precos_atuais}
                onSuccess={() => {
                    closeModal();
                    onRefresh();            
                }}
            />
        </View>
    );
}