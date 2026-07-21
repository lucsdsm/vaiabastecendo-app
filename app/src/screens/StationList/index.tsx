import React, { useEffect } from 'react';
import { FlatList, Image, RefreshControl, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import StationCard from '../../components/StationCard';
import EmptyState from '../../components/EmptyState';
import LoadingState from '../../components/LoadingState';
import Banner from '../../components/Banner';
import { styles } from './styles';
import { useStationList } from './useStationList';

export default function StationListScreen() {
  const {
    colors,
    isDark,
    stations,
    isLoading,
    isRefreshing,
    error,
    refetch,
    shouldShowErrorCard,
  } = useStationList();

  const route = useRoute<any>();

  useEffect(() => {
    if (!route.params?.refreshKey) {
      return;
    }

    refetch();
  }, [route.params?.refreshKey, refetch]);

  function renderHeader() {
    return (
      <>
        <Header />
        <Banner
          text="Compartilhe preços e ajude outros motoristas!"
          gradientColors={[colors.primary, colors.primary, colors.success]}
          logoElement={
            <Image
              source={require('../../../assets/images/two.png')}
              style={{
                width: 128,
                height: 128,
                resizeMode: 'contain',
              }}
            />
          }
        />
      </>
    );
  }

  function renderEmptyState() {
    if (isLoading) {
      return (
        <LoadingState
          message="Buscando postos próximos..."
          iconName="map-marker-alt"
        />
      );
    }

    if (shouldShowErrorCard) {
      return <EmptyState message={error || undefined} onRetry={refetch} />;
    }

    return (
      <EmptyState
        title="Nenhum posto encontrado."
        message="Ainda não há postos cadastrados no sistema. Puxe para baixo para atualizar!"
        iconName="map"
      />
    );
  }

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <View style={styles.content}>
        <FlatList
          data={stations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <StationCard data={item} onRefresh={refetch} />
          )}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmptyState}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={refetch}
              colors={[colors.primary]}
              progressViewOffset={80}
              style={{ backgroundColor: colors.background }}
            />
          }
          contentContainerStyle={[
            styles.listContainer,
            stations.length === 0 && { flexGrow: 1 },
          ]}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <Footer />
    </SafeAreaView>
  );
}