import React from 'react';
import { Text, View, StyleProp, ViewStyle, Image } from 'react-native';

import { styles } from './styles';
import { useAppTheme } from '../../theme/ThemeProvider';

import { iconsDictionary } from '../../utils/iconsDictionary';

interface EmptyStateProps {
    title?: string;
    message?: string;
    iconName?: keyof typeof iconsDictionary;
    style?: StyleProp<ViewStyle>;
}

export default function EmptyState({ 
    title = 'Dados indisponíveis',
    message = 'Não foi possível receber os dados no momento. Tente novamente mais tarde.', 
    iconName,
    style
}: EmptyStateProps) {
    const { colors, isDark } = useAppTheme();
    const imageSource = iconName ? iconsDictionary[iconName] : iconsDictionary.logo;

    return (
        <View style={[styles.container, { backgroundColor: colors.background }, style]}>
            <View style={styles.iconContainer} >
                <Image source={imageSource} style={{ width: 128, height: 128 }} />
            </View>
            
            <Text style={[styles.title, { color: colors.textPrimary }]}>
                {title}
            </Text>
            
            <Text style={[styles.message, { color: colors.textSecondary }]}>
                {message}
            </Text>
        </View>
    );
}