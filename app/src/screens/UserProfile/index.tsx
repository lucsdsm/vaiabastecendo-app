import React from 'react';
import {
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

import Button from '../../components/Button';

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
            {user?.username || ''}
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          !token && styles.scrollContentGuest,
        ]}
      >
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

            <Button
              title="Entrar com Google"
              onPress={() => promptAsync()}
              disabled={!request}
              variant="secondary"
              iconLeft={<FontAwesome5 name="google" size={16} color="#FFF" />}
            />
          </View>
        )}
      </ScrollView>

      <Version />
    </SafeAreaView>
  );
}