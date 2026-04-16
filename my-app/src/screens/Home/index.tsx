import React from 'react';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';

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
    <View style={[styles.container, { backgroundColor: colors.background }]}>
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
            refreshing={refreshing}
            onRefresh={refetch}
            ListHeaderComponent={
              <View style={styles.listHeader}>
                <Text style={[styles.listTitle, { color: colors.textPrimary }]}> 
                  Postos + próximos de você:
                </Text>
              </View>
            }
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
      <Footer />
    </View>
  );
}
