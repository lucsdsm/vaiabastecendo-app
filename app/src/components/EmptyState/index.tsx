import React from 'react';
import { Text, View, StyleProp, ViewStyle, Image } from 'react-native';

import { iconsDictionary } from '@utils/iconsDictionary';

import { useAppTheme } from '@theme/ThemeProvider';

import { styles } from './styles';

interface EmptyStateProps {
    title?: string;
    message?: string;
    iconName?: keyof typeof iconsDictionary;
    style?: StyleProp<ViewStyle>;
}

/**
 * Componente de estado vazio que exibe uma mensagem e um ícone quando não há dados para serem exibidos.
 */
export default function EmptyState({ 
    title = 'Dados indisponíveis',
    message = 'Não foi possível receber os dados no momento. Tente novamente mais tarde.', 
    iconName,
    style
}: EmptyStateProps) {
    const { colors } = useAppTheme();
    const imageSource = iconName ? iconsDictionary[iconName] : iconsDictionary.logo;

    return (
        <View style={[styles.container, { backgroundColor: colors.background }, style]}>
            <Image source={imageSource} style={{ width: 128, height: 128 }} />
            
            <Text style={[styles.title, { color: colors.textPrimary }]}>
                {title}
            </Text>
            
            <Text style={[styles.message, { color: colors.textSecondary }]}>
                {message}
            </Text>
        </View>
    );
}