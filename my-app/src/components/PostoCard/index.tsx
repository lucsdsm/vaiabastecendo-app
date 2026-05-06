import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';

import UpdatePriceModal from '../UpdatePriceModal';
import { styles } from './styles';
import { PostoProps, usePostoCard } from './usePostoCard';

import { formatarTempoDecorrido } from '../../utils/dateFormatter';
import { dicionarioBandeiras } from '../../utils/dictFlags';

export type { PostoProps, PrecoAtual } from './usePostoCard';

/**
 * Card elegante e minimalista para exibição de posto de combustível.
 * Mostra preços, localização, likes e informações de atualização.
 */
export default function PostoCard({ data, onRefresh }: { data: PostoProps; onRefresh: () => void }) {
    const {
        colors,
        isDark,
        modalVisible,
        priceRows,
        closeModal,
        handleGetDirections,
        toggleLike,
        handleOpenUpdateModal,
    } = usePostoCard(data);

    const logoSource = dicionarioBandeiras[data.bandeira];
    const hasPrecos = data.precos_atuais && data.precos_atuais.length > 0;

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: colors.surface,
                    borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                },
            ]}
        >
            <TouchableOpacity activeOpacity={0.7} onPress={handleOpenUpdateModal}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Text
                            style={[styles.title, { color: colors.textPrimary }]}
                            numberOfLines={1}>
                            {data.nome} 
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, minWidth: 0 }}>
                            <Feather name="navigation" size={12} color={colors.primary} />
                            <Text style={[styles.addressText, { color: colors.textSecondary, marginLeft: 2 }]} numberOfLines={1} ellipsizeMode="tail">
                                {data.distancia}
                            </Text>
                            <Text style={[styles.addressText, { color: colors.textSecondary, marginLeft: 6, flexShrink: 1 }]} numberOfLines={1} ellipsizeMode="tail">
                                {data.endereco}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.headerRight}>
                        {/* Logo da Bandeira */}
                        <View style={[styles.logoContainer]}>
                            {logoSource ? (
                                <Image source={logoSource} style={styles.logoImage} />
                            ) : (
                                <View style={[styles.logoContainer, styles.emojiContainer]}>
                                    <Text style={styles.emojiText}>⚪</Text>
                                </View>
                            )}
                        </View>

                        {/* Botão de Direções */}
                        <TouchableOpacity
                            style={[
                                styles.directionsButton,
                                {
                                    borderColor: colors.primary,
                                    backgroundColor: colors.primary + '0D',
                                },
                            ]}
                            onPress={handleGetDirections}
                            activeOpacity={0.7}
                        >
                            <Feather name="map-pin" size={16} color={colors.primary} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Preços */}
                <View style={styles.priceContainer}>
                    {hasPrecos ? (
                        priceRows.map((row, rowIndex) => (
                            <View key={rowIndex} style={styles.priceRow}>
                                {row.map((item, index) => (
                                    <View
                                        key={`${rowIndex}-${index}`}
                                        style={styles.priceBlock}
                                    >
                                        <View
                                            style={[
                                                styles.priceBadge,
                                                {
                                                    backgroundColor:
                                                        item.cor + (isDark ? '1A' : '0A'),
                                                },
                                            ]}
                                        >
                                            {/* Header do Badge */}
                                            <View style={styles.priceBadgeHeader}>
                                                <View style={styles.fuelLabelContainer}>
                                                    <Text
                                                        style={[
                                                            styles.fuelLabel,
                                                            { color: item.cor },
                                                        ]}
                                                        numberOfLines={2}
                                                        adjustsFontSizeToFit
                                                        minimumFontScale={0.85}
                                                    >
                                                        {item.tipo}
                                                    </Text>
                                                </View>
                                            </View>

                                            {/* Preço */}
                                            <View>
                                                <Text
                                                    style={[
                                                        styles.priceValue,
                                                        { color: item.cor },
                                                    ]}
                                                >
                                                    R$ {item.preco.toFixed(2)}
                                                </Text>
                                            </View>

                                            {/* Like Button */}
                                            <TouchableOpacity
                                                style={[
                                                    styles.likeButton,
                                                    {
                                                        backgroundColor: item.is_liked
                                                            ? colors.danger + '15'
                                                            : isDark
                                                                ? 'rgba(255,255,255,0.08)'
                                                                : 'rgba(0,0,0,0.04)',
                                                    },
                                                ]}
                                                onPress={() => toggleLike(item.id)}
                                                activeOpacity={0.7}
                                            >
                                                <Feather
                                                    name={item.is_liked ? 'heart' : 'thumbs-up'}
                                                    size={12}
                                                    color={
                                                        item.is_liked
                                                            ? colors.danger
                                                            : colors.textSecondary
                                                    }
                                                />
                                                <Text
                                                    style={[
                                                        styles.likeCount,
                                                        {
                                                            color: item.is_liked
                                                                ? colors.danger
                                                                : colors.textSecondary,
                                                        },
                                                    ]}
                                                >
                                                    {item.likes}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        ))
                    ) : (
                        <View
                            style={[
                                styles.noPriceContainer,
                                {
                                    backgroundColor: colors.primary + (isDark ? '15' : '08'),
                                    borderColor: colors.primary + '30',
                                },
                            ]}
                        >
                            <View
                                style={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: 12,
                                    backgroundColor: colors.primary + '20',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Feather name="plus" size={18} color={colors.primary} />
                            </View>
                            <View style={styles.noPriceTextContainer}>
                                <Text
                                    style={[styles.noPriceTitle, { color: colors.textPrimary }]}
                                >
                                    Sem preços cadastrados
                                </Text>
                                <Text
                                    style={[styles.noPriceText, { color: colors.textSecondary }]}
                                >
                                    Seja o primeiro a informar os preços!
                                </Text>
                            </View>
                        </View>
                    )}
                </View>

                {/* Update Info */}
                {hasPrecos && data.autor_ultimaAtualizacao && (
                    <View
                        style={[styles.updateInfo,
                            {
                                borderTopColor: isDark
                                    ? 'rgba(255,255,255,0.06)'
                                    : 'rgba(0,0,0,0.04)',
                            },
                        ]}>
                        <Feather name="user" size={11} color={colors.textSecondary} style={{ marginRight: 4 }}/>
                        <Text style={[styles.updateText, { color: colors.textSecondary }]}>
                            Atualizado por{' '}
                        </Text>
                        <Text style={[styles.authorText, { color: colors.textPrimary }]}>
                            {data.autor_ultimaAtualizacao}{' '}
                        </Text>
                        
                        <Text style={[styles.metaText, { color: colors.textSecondary },]}>
                            {formatarTempoDecorrido(data.data_ultimaAtualizacao)}
                        </Text>
                        <Feather name="clock" size={11} color={colors.textSecondary} />
                    </View>
                )}

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
            </TouchableOpacity>
        </View>
    );
}
