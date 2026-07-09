import React, { useEffect } from 'react';
import { Text, View, FlatList, ActivityIndicator, RefreshControl, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PostoCard from '../../components/PostoCard';
import EmptyState from '../../components/EmptyState';
import Banner from '../../components/Banner';
import { styles } from './styles';
import { usePostosList } from './usePostosList';

export default function HomeScreen() {
  const {
    colors,
    isDark,
    postos,
    loading,
    refreshing,
    error,
    refetch,
    shouldShowErrorCard,
  } = usePostosList();

  const route = useRoute<any>();

  useEffect(() => {
    if (!route.params?.refreshKey) {
      return;
    }
    refetch();
  }, [route.params?.refreshKey, refetch]);

  // 1. Isolamos o Header e o Banner numa constante para o topo da lista
  const renderHeader = () => (
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
              resizeMode: 'contain'
            }}
          />
        }
      />
    </>
  );

  // 2. Isolamos a lógica de Loading, Erro e Lista Vazia em uma única função
  const renderEmptyState = () => {
    if (loading) {
      return (
        <View style={styles.centerLoading}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={{ color: colors.textSecondary, marginTop: 10 }}>
            Buscando postos próximos...
          </Text>
        </View>
      );
    }

    if (shouldShowErrorCard) {
      return <EmptyState message={error || undefined} onRetry={refetch} />;
    }

    return (
      <EmptyState
        title="Nenhum posto encontrado"
        message="Ainda não há postos cadastrados no sistema. Puxe para baixo para atualizar ou seja o primeiro a adicionar um!"
        iconName="map"
      />
    );
  };

  return (
    <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <View style={styles.content}>
        {/* A FlatList agora é renderizada SEMPRE, gerenciando os próprios estados */}
        <FlatList
          data={postos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PostoCard data={item} onRefresh={refetch} />}
          
          // Injetamos o cabeçalho e os estados de vazio aqui:
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmptyState}
          
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refetch}
              colors={[colors.primary]}
              progressViewOffset={80}
              style={{ backgroundColor: colors.background }}
            />
          }
          contentContainerStyle={[
            styles.listContainer,
            // Mantém a lógica de expandir caso não tenha postos para centralizar o loader/erro
            postos.length === 0 && { flexGrow: 1 } 
          ]}
          showsVerticalScrollIndicator={false}
        />
      </View>
      
      <Footer />
    </SafeAreaView>
  );
}