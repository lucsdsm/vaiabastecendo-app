import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Version from '../../components/Version';
import UserCard from '../../components/UserCard';
import { useUserProfile } from '../../components/UserCard/useUserProfile';
import { useAppTheme } from '../../theme/ThemeProvider';
import { styles } from './styles';

import { useAuth } from '../../contexts/AuthContext';

import LoadingState from '@components/LoadingState';
import EmptyState from '@components/EmptyState';

/**
 * Tela de perfil do usuário com autenticação, resumo da conta
 * e acesso ao fluxo de entrada com Google.
 */
export default function UserProfile() {
  const { colors } = useAppTheme();
  const navigation = useNavigation();

  const { user } = useAuth();

  const {
    userData,
    isLoading,
    token,
    request,
    promptAsync,
    handleLogout,
    handleMockLogin,
  } = useUserProfile();

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerActionButton}
        >
          <Feather name="arrow-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text
            style={[styles.headerTitle, { color: colors.textPrimary }]}
            onLongPress={__DEV__ ? handleMockLogin : undefined}
          >
            {user?.username || 'Perfil do usuário'}
          </Text>
        </View>

        {token ? (
          <TouchableOpacity
            onPress={handleLogout}
            style={styles.headerActionButton}
          >
            <Feather name="log-out" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        ) : (
          <View style={styles.headerActionButton} />
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <LoadingState />
        ) : token ? (
          <View>
            <UserCard userData={userData} />
          </View>
        ) : (
          <View style={styles.guestContainer}>
            <EmptyState
              iconName="user"
              title="Seu perfil"
              message="Faça login para acompanhar suas curtidas, ganhar reputação e contribuir com a comunidade."
            />

            <TouchableOpacity
              style={styles.googleButton}
              activeOpacity={0.8}
              disabled={!request}
              onPress={() => promptAsync()}
            >
              <FontAwesome5 name="google" size={18} color="#FFF" />
              <Text style={styles.googleButtonText}>Entrar com Google</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <Version />
    </SafeAreaView>
  );
}