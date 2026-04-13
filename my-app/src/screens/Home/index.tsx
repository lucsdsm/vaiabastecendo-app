import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { useAppTheme } from '../../theme/ThemeProvider';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PostoCard from '../../components/PostoCard';
import EmptyState from '../../components/EmptyState';

import { usePostos } from '../../hooks/usePostos';

export default function HomeScreen() {
  const { colors, isDark } = useAppTheme();
  const { postos, loading, refreshing, error, refetch } = usePostos();
  
  const shouldShowErrorCard = !loading && !!error && postos.length === 0;

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

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
  centerLoading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listHeader: { paddingHorizontal: 25, paddingTop: 16, paddingBottom: 16, alignItems: 'center' },
  listTitle: { fontSize: 24, fontFamily: 'StoryScript_400Regular' },
  listContainer: { paddingHorizontal: 20, paddingBottom: 20 }
});