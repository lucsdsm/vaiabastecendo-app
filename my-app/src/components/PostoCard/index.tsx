import React from 'react';
import { Image, StyleProp, ScrollView, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';

import UpdatePriceModal from '../UpdatePriceModal';
import { styles } from './styles';
import { PostoProps, usePostoCard } from './usePostoCard';

import { formatarTempoDecorrido } from '../../utils/dateFormatter';
import { dicionarioBandeiras } from '../../utils/dictFlags';
import { getReadableColor } from '../../utils/color';

export type { PostoProps, PrecoAtual } from './usePostoCard';

interface LocalBadgeProps {
    label: string;
    color: string;
    textColor?: string;
    icon?: React.ReactNode;
}

function LocalBadge({ label, color, textColor = '#111111', icon }: LocalBadgeProps) {
    return (
        <View style={[styles.badge, { backgroundColor: color }]}>
            <View style={styles.badgeContent}>
                {icon ? <View style={styles.badgeIcon}>{icon}</View> : null}
                <Text style={[styles.badgeText, { color: textColor }]}>{label}</Text>
            </View>
        </View>
    );
}

interface LocalCardProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}

function LocalCard({ children, style }: LocalCardProps) {
    return <View style={[styles.localCardBase, style]}>{children}</View>;
}

/**
 * Card para exibição de posto de combustível.
 * Mostra preços, localização, likes e informações de atualização.
 */
export default function PostoCard({ data, onRefresh }: { data: PostoProps; onRefresh: () => void }) {
    const {
        colors,
        isDark,
        modalVisible,
        modalPosto,
        precosLocais,
        closeModal,
        handleGetDirections,
        toggleLike,
        handleOpenUpdateModal,
    } = usePostoCard(data);

    const logoSource = dicionarioBandeiras[data.bandeira];
    const hasPrecos = precosLocais.length > 0;

    return (
        <LocalCard
            style={[
                styles.card,
                {
                    backgroundColor: colors.surface,
                    borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                },
            ]}
        >
            {/* Header */}
            <TouchableOpacity activeOpacity={0.7} onPress={handleOpenUpdateModal}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Text
                            style={[styles.title, { color: colors.textPrimary }]}
                            numberOfLines={1}>
                            {data.nome} 
                        </Text>
                        <View style={styles.addressRow}>
                            <LocalBadge
                                label={data.distancia}
                                color={colors.primary + (isDark ? '22' : '12')}
                                textColor={colors.primary}
                                icon={<Feather name="navigation" size={12} color={colors.primary} />}
                            />
                            <Text
                                style={[styles.addressText, { color: colors.textSecondary }]}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {data.endereco}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.headerRight}>
                        <View style={styles.logoContainer}>
                            {logoSource ? (
                                <Image source={logoSource} style={styles.logoImage} />
                            ) : null}
                        </View>

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
                            accessibilityRole="button"
                            accessibilityLabel="Abrir direções no mapa"
                        >
                            <Feather name="map-pin" size={16} color={colors.primary} />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>

            {/* Carrossel de Preços */}
            <View style={styles.priceContainer}>
                {hasPrecos ? (
                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.pricesScrollContent}
                    >
                        {precosLocais.map((item, index) => {
                            const accentColor = getReadableColor(item.cor, isDark);
                            return (
                                <View
                                    key={index}
                                    style={[
                                        styles.priceBlock,
                                        styles.priceBadge,
                                        {
                                            backgroundColor: accentColor + (isDark ? '1A' : '0A'),
                                        },
                                    ]}
                                >
                                    <View style={styles.priceBadgeHeader}>
                                        <View style={styles.fuelLabelContainer}>
                                            <Text
                                                style={[
                                                    styles.fuelLabel,
                                                    { color: accentColor },
                                                ]}
                                                numberOfLines={2}
                                                adjustsFontSizeToFit
                                                minimumFontScale={0.85}
                                            >
                                                {item.tipo}
                                            </Text>
                                        </View>
                                    </View>

                                    <View>
                                        <Text
                                            style={[
                                                styles.priceValue,
                                                { color: accentColor },
                                            ]}
                                            numberOfLines={1}
                                            adjustsFontSizeToFit
                                            minimumFontScale={0.9}
                                        >
                                            R$ {item.preco.toFixed(2)}
                                        </Text>
                                    </View>

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
                                        accessibilityRole="button"
                                        accessibilityLabel={`Curtir preço de ${item.tipo}`}
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
                            );
                        })}
                    </ScrollView>
                ) : (
                    /* Se não tem preços, a área tracejada inteira vira o botão de adicionar */
                    <TouchableOpacity activeOpacity={0.7} onPress={handleOpenUpdateModal}>
                        <View
                            style={[
                                styles.noPriceContainer,
                                {
                                    backgroundColor: colors.primary + (isDark ? '15' : '08'),
                                    borderColor: colors.primary + '30',
                                },
                            ]}
                        >
                            <View style={[styles.noPriceIconContainer, { backgroundColor: colors.primary + '20' }]}>
                                <Feather name="plus" size={18} color={colors.primary} />
                            </View>
                            <View style={styles.noPriceTextContainer}>
                                <Text style={[styles.noPriceTitle, { color: colors.textPrimary }]}>
                                    Sem preços cadastrados
                                </Text>
                                <Text style={[styles.noPriceText, { color: colors.textSecondary }]}>
                                    Seja o primeiro a informar os preços!
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            </View>

            {/* Rodapé */}
            {hasPrecos && data?.autor_ultimaAtualizacao?.nome && (
                <TouchableOpacity activeOpacity={0.7} onPress={handleOpenUpdateModal}>
                    <View
                        style={[
                            styles.updateInfo,
                            {
                                borderTopColor: isDark
                                    ? 'rgba(255,255,255,0.06)'
                                    : 'rgba(0,0,0,0.04)',
                            },
                        ]}>
                        <Feather name="user" size={11} color={colors.textSecondary} style={styles.updateIcon}/>
                        <Text style={[styles.updateText, { color: colors.textSecondary }]}>Atualizado </Text>
                        
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.metaText, { color: colors.textSecondary }]}>
                                {formatarTempoDecorrido(data.data_ultimaAtualizacao)}por{' '}
                                <Text style={[styles.authorText, { color: colors.textPrimary }]}>
                                    {data.autor_ultimaAtualizacao.nome}
                                </Text>
                            </Text>

                            {/* Exibe o selo azul de verificado ao lado do nome do autor */}
                            {data.autor_ultimaAtualizacao.verificado && (
                                <MaterialIcons 
                                    name="verified" 
                                    size={16}
                                    color={colors.primary}
                                    style={{ marginLeft: 3 }}
                                />
                            )}
                        </View>
                    </View>
                </TouchableOpacity>
            )}

            <UpdatePriceModal
                visible={modalVisible}
                onClose={closeModal}
                postoId={(modalPosto ?? data).id}
                postoNome={(modalPosto ?? data).nome}
                precosAtuais={(modalPosto ?? data).precos_atuais}
                onSuccess={() => {
                    closeModal();
                    onRefresh();
                }}
            />
        </LocalCard>
    );
}