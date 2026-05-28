import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import Footer from '../../components/Footer';
import PostoCard from '../../components/PostoCard';
import Map from '../../components/Map'; 
import { styles } from './styles';
import { useMapScreen } from '../../components/Map/useMapScreen';

export default function MapScreen() {
    const {
        colors,
        isDark,
        postos,
        initialRegion,
        userRegion,
        recenterToken,
        selectedPosto,
        handleSelectPosto,
        handleCloseCard,
        refetch
    } = useMapScreen();

    return (
        <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar style={isDark ? 'light' : 'dark'} />
            <View style={styles.content}>
                {/* O Componente Mapa Isolado */}
                <Map 
                    postos={postos}
                    initialRegion={initialRegion}
                    targetRegion={userRegion}
                    recenterToken={recenterToken}
                    selectedPostoId={selectedPosto?.id}
                    onSelectPosto={handleSelectPosto}
                    onMapPress={handleCloseCard}
                />

                {/* Overlay do Cartão do Posto na parte inferior */}
                {selectedPosto && (
                    <View style={styles.cardOverlay} pointerEvents="box-none">
                        <View style={styles.cardWrapper}>
                            <PostoCard data={selectedPosto} onRefresh={refetch} />
                        </View>
                    </View>
                )}
            </View>

            <Footer />
        </SafeAreaView>
    );
}