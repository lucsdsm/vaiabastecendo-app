import React from 'react';
import { Text, View, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PostoCard from '../../components/PostoCard';
import EmptyState from '../../components/EmptyState';
import { styles } from './styles';
import { useHomeScreen } from './useHomeScreen';

/**
 * Tela inicial com lista de postos proximos e suporte a recarregamento.
 */
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
  } = useHomeScreen();

  return (
    <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Header />

      <View style={styles.content}>
        {loading ? (
          <View style={styles.centerLoading}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={{ color: colors.textSecondary, marginTop: 10 }}>
              Buscando postos próximos...
            </Text>
          </View>
        ) : shouldShowErrorCard ? (
          <EmptyState message={error || undefined} onRetry={refetch} />
        ) : (
          <FlatList
            data={postos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PostoCard data={item} onRefresh={refetch} />}
            // refreshing={refreshing}
            // onRefresh={refetch}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={refetch}
                colors={[colors.primary]}
                progressViewOffset={80}
                style={{ backgroundColor: colors.background }}
              />
            }

            ListEmptyComponent={
              <EmptyState
                title="Nenhum posto encontrado"
                message="Ainda não há postos cadastrados no sistema. Puxe para baixo para atualizar ou seja o primeiro a adicionar um!"
                iconName="map"
              />
            }

            contentContainerStyle={[
              styles.listContainer,
              postos.length === 0 && { flexGrow: 1, justifyContent: 'center' }
            ]}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
      <Footer />
    </SafeAreaView>
  );
}
