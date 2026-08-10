import React from 'react';
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';

import { useSettings } from './useSettings';
import { useAppTheme } from '../../theme/ThemeProvider';
import { styles } from './styles';
import Version from '../../components/Version';
import Footer from '../../components/Footer';

/**
 * Tela de configurações do aplicativo.
 */
export default function Settings() {
    const { colors } = useAppTheme();
    const navigation = useNavigation<any>();
    const { isDark, toggleTheme } = useSettings();

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
                    style={styles.headerActionButton}
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
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.section}>
                    {/* Tema */}
                    <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                        Tema do aplicativo
                    </Text>
                    <Pressable
                        onPress={toggleTheme}
                        style={({ pressed }) => [
                            styles.settingsButton,
                            {
                                backgroundColor: colors.primary + (isDark ? '14' : '0D'),
                                borderColor: colors.primary + '40',
                            },
                            pressed && { opacity: 0.6 },
                        ]}
                        accessibilityRole="button"
                        accessibilityLabel="Alternar tema"
                    >
                        <Text style={[styles.settingsButtonText, { color: colors.textPrimary }]}>
                            Tem atual: {isDark ? 'Escuro' : 'Claro'}
                        </Text>

                        <FontAwesome6
                            name={isDark ? 'moon' : 'sun'}
                            size={20}
                            iconStyle="solid"
                            color={colors.primary}
                        />
                    </Pressable>

                    {/* Raio de busca */}
            
                    <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                        Raio de busca
                    </Text>

                    <Text style={[styles.sectionDescription, { color: colors.textSecondary }]}>
                        Escolha a distância usada para buscar postos próximos da sua localização.
                    </Text>

                    <View style={styles.sliderCard}>
                        <Text style={[styles.sliderValue, { color: colors.textPrimary }]}>
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

                        <View style={styles.sliderLabels}>
                            <Text style={[styles.sliderLabel, { color: colors.textSecondary }]}>2 km</Text>
                            <Text style={[styles.sliderLabel, { color: colors.textSecondary }]}>3 km</Text>
                            <Text style={[styles.sliderLabel, { color: colors.textSecondary }]}>5 km</Text>
                        </View>
                    </View>
                </View>
                <Version />
            </ScrollView>
            <Footer />
        </SafeAreaView>
    );
}