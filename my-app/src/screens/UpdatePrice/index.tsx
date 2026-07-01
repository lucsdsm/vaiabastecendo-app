import React from 'react';
import { useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppTheme } from '../../theme/ThemeProvider';
import UpdatePriceCard from '../../components/UpdatePriceCard';
import { PrecoAtualResumo } from '../../components/UpdatePriceCard/useUpdatePriceModal';
import { styles } from './styles';

type UpdatePriceRouteParams = {
    postoId: string;
    postoNome: string;
    precosAtuais: PrecoAtualResumo[];
};

export default function UpdatePrice() {
    const { colors } = useAppTheme();
    const navigation = useNavigation();
    const route = useRoute<any>();

    const { postoId, postoNome, precosAtuais } = route.params as UpdatePriceRouteParams;

    const handleSuccess = () => {
        navigation.navigate('Home' as never, { refreshKey: Date.now() } as never);
    };

    return (
        <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Feather name="arrow-left" size={24} color={colors.textPrimary} />
                </TouchableOpacity>
                <View style={styles.headerTextContainer}>
                    <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Atualizar preço</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]} numberOfLines={1}>
                        {postoNome}
                    </Text>
                </View>
                <View style={styles.headerSpacer} />
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <UpdatePriceCard
                    postoId={postoId}
                    postoNome={postoNome}
                    precosAtuais={precosAtuais}
                    onSuccess={handleSuccess}
                />
            </ScrollView>
        </SafeAreaView>
    );
}