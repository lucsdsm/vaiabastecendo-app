import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';

import { ThemeProvider, useAppTheme } from './src/theme/ThemeProvider';
import LoadingScreen from './src/components/LoadingScreen';
import Header from './src/components/Header';
import Footer from './src/components/Footer';

import { useFonts, StoryScript_400Regular } from '@expo-google-fonts/story-script';
import PostoCard from './src/components/PostoCard';

import { usePostos } from './src/hooks/usePostos';

export default function App() {
  const [fontsLoaded] = useFonts({ StoryScript_400Regular });
  const [isAppReady, setIsAppReady] = useState(false);

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider>
      <AppContent />
      {!isAppReady && <LoadingScreen onFinish={() => setIsAppReady(true)} />}
    </ThemeProvider>
  );
}

function AppContent() {
  const { colors, isDark } = useAppTheme();
  
  const { postos, loading, refreshing, refetch } = usePostos();

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