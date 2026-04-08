import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';

import { ThemeProvider, useAppTheme } from './src/theme/ThemeProvider';

import LoadingScreen from './src/components/LoadingScreen';
import Header from './src/components/Header';
import Footer from './src/components/Footer';

import { useFonts, StoryScript_400Regular } from '@expo-google-fonts/story-script';

import PostoCard , { PostoProps } from './src/components/PostoCard';

/**
 * Mock de dados para exibição dos postos. Esses dados virão de uma API.
*/
const MOCK_POSTOS: PostoProps[] = [
  {
    id: '1',
    nome: 'Posto Shell Rota do Sol',
    distancia: '1.2 km',
    precoGasolina: 5.89,
    precoEtanol: 4.39,
    ultimaAtualizacao: 'há 15 minutos',
    likes: 10,
  },
  {
    id: '2',
    nome: 'Posto Ale Morro Branco',
    distancia: '2.5 km',
    precoGasolina: 5.75,
    precoEtanol: 4.25,
    ultimaAtualizacao: 'há 2 horas',
    likes: 8,
  },
  {
    id: '3',
    nome: 'Posto BR Ponta Negra',
    distancia: '3.1 km',
    precoGasolina: 5.99,
    precoEtanol: 4.50,
    ultimaAtualizacao: 'há 3 minutos',
    likes: 15,
  }
];

/**
 * Componente raiz do app.
 * Carrega fontes antes de montar a interface para evitar flicker visual.
*/
export default function App() {

  const [fontsLoaded] = useFonts({
    StoryScript_400Regular,
  });

  const [isAppReady, setIsAppReady] = useState(false);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <AppContent />
      {/* Overlay temporario de splash controlado pelo estado local da aplicacao. */}
      {!isAppReady && (
        <LoadingScreen onFinish={() => setIsAppReady(true)} />
      )}
    </ThemeProvider>
  );
}

/**
 * Conteudo principal da tela com tema dinamico.
*/
function AppContent() {
  const { colors, isDark } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Header />

      {/* View de conteúdo em FlatList */}
      <View style={styles.content}>

        <FlatList
          data={MOCK_POSTOS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PostoCard data={item} />}
          ListHeaderComponent={
            <View style={styles.listHeader}>
              <Text style={[styles.listTitle, { color: colors.textPrimary }]}> 
                Postos + próximos de você:
              </Text>
            </View>
          }
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false} // Esconde a barra de rolagem nativa para um visual mais limpo
        />

      </View>
      
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  listHeader: {
    paddingHorizontal: 25,
    paddingTop: 16,
    paddingBottom: 16,
    alignItems: 'center',
  },
  listTitle: {
    fontSize: 24,
    fontFamily: 'StoryScript_400Regular',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  }
});
