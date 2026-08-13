import React from 'react';
import { ScrollView, Text, TouchableOpacity, View, Pressable } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from "@navigation/types";
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';

import { useSettings } from './useSettings';
import { useAppTheme } from '@theme/ThemeProvider';
import { styles } from './styles';
import Button from '@components/Button';
import Version from '@components/Version';
import Footer from '@components/Footer';

/**
 * Tela de configurações do aplicativo.
 */
export default function Settings() {
    const { colors } = useAppTheme();
    const navigation = useNavigation<RootNavigationProp>();
    const { 
        isDark, 
        toggleTheme, 
        isExporting, 
        isImporting, 
        handleExportBackup, 
        handleImportBackup 
    } = useSettings();

    const radiusValues: Array<2 | 3 | 5> = [2, 3, 5];
    const [radiusKm, setRadiusKm] = React.useState<2 | 3 | 5>(3);
    const sliderIndex = radiusValues.indexOf(radiusKm);

    React.useEffect(() => {
        let isMounted = true;

        async function loadRadiusPreference() {
            try {
                const storedRadius = await AsyncStorage.getItem('@search_radius_km');

                if (!isMounted) {
                    return;
                }

                if (storedRadius === '2' || storedRadius === '3' || storedRadius === '5') {
                    setRadiusKm(Number(storedRadius) as 2 | 3 | 5);
                } else {
                    setRadiusKm(3);
                }
            } catch (error) {
                console.warn('Erro ao carregar raio de busca:', error);
            }
        }

        loadRadiusPreference();

        return () => {
            isMounted = false;
        };
    }, []);

    const handleSelectRadius = async (value: 2 | 3 | 5) => {
        try {
            setRadiusKm(value);
            await AsyncStorage.setItem('@search_radius_km', String(value));
        } catch (error) {
            console.warn('Erro ao salvar raio de busca:', error);
        }
    };

    return (
        <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.actions}
                    accessibilityRole="button"
                    accessibilityLabel="Voltar"
                >
                    <FontAwesome6
                        name="arrow-left"
                        size={20}
                        iconStyle="solid"
                        color={colors.textPrimary}
                    />
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scroll}>
                <View style={styles.section}>
                    {/* Tema */}
                    <Text style={[styles.title, { color: colors.textPrimary }]}>
                        Tema do aplicativo
                    </Text>

                    <Button
                        title={isDark ? 'Tema atual: Escuro' : 'Tema atual: Claro'}
                        onPress={toggleTheme}
                        iconLeft={isDark ? <FontAwesome6 name="moon" size={16} iconStyle='solid'/> : <FontAwesome6 name="sun" size={16} iconStyle='solid'/>}
                        variant="secondary"
                    />

                    {/* Raio de busca */}
                    <Text style={[styles.title, { color: colors.textPrimary }]}>
                        Raio de busca
                    </Text>

                    <Text style={[styles.description, { color: colors.textSecondary }]}>
                        Escolha a distância usada para buscar postos próximos da sua localização.
                    </Text>

                    <View style={styles.card}>
                        <Text style={[styles.value, { color: colors.textPrimary }]}>
                        {radiusKm} km
                        </Text>

                        <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={2}
                            step={1}
                            value={sliderIndex}
                            onValueChange={(value) => {
                                const roundedIndex = Math.round(value) as 0 | 1 | 2;
                                setRadiusKm(radiusValues[roundedIndex]);
                            }}
                            onSlidingComplete={(value) => {
                                const roundedIndex = Math.round(value) as 0 | 1 | 2;
                                handleSelectRadius(radiusValues[roundedIndex]);
                            }}
                            minimumTrackTintColor={colors.primary}
                            maximumTrackTintColor={colors.primary + '30'}
                            thumbTintColor={colors.primary}
                        />

                        <View style={styles.labels}>
                            <Text style={[styles.label, { color: colors.textSecondary }]}>2 km</Text>
                            <Text style={[styles.label, { color: colors.textSecondary }]}>3 km</Text>
                            <Text style={[styles.label, { color: colors.textSecondary }]}>5 km</Text>
                        </View>
                    </View>

                    <Text style={[styles.title, { color: colors.textPrimary }]}>
                        Dados do diário
                    </Text>

                    <Text style={[styles.description, { color: colors.textSecondary }]}>
                        Faça backup ou restaure os dados do diário de abastecimento.
                    </Text>

                    {/* Botões de exportação e importação de dados */}
                    <Button
                        title={isExporting ? 'Exportando...' : 'Exportar dados'}
                        onPress={handleExportBackup}
                        disabled={isExporting || isImporting}
                        loading={isExporting}
                        iconLeft={<FontAwesome6 name="file-export" size={16} iconStyle='solid'/>}
                        variant="secondary"
                    />
                    <Button
                        title={isImporting ? 'Importando...' : 'Importar dados'}
                        onPress={handleImportBackup}
                        disabled={isExporting || isImporting}
                        loading={isImporting}
                        iconLeft={<FontAwesome6 name="file-import" size={16} iconStyle='solid'/>}
                        variant="secondary"
                    />

                    <Text style={[styles.title, { color: colors.textPrimary }]}>
                        Termos de uso
                    </Text>
                    
                    <Button
                        title="Termos de serviço"
                        onPress={() => navigation.navigate('PrivacyTerms')}
                        iconLeft={<FontAwesome6 name="file-contract" size={16} iconStyle='solid'/>}
                        variant="secondary"
                    />
                    <Button
                        title="Política de privacidade"
                        onPress={() => navigation.navigate('PrivacyTerms')}
                        iconLeft={<FontAwesome6 name="shield-halved" size={16} iconStyle='solid'/>}
                        variant="secondary"
                    />

                </View>
                <Version />
            </ScrollView>
            <Footer />
        </SafeAreaView>
    );
}