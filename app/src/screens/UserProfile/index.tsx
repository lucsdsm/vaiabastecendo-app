import React from 'react';
import { ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from '@navigation/types';

import { useUserProfile } from '@components/UserCard/useUserProfile';

import { useAppTheme } from '@theme/ThemeProvider';

import { useAuth } from '@contexts/AuthContext';

import Button from '@components/Button';
import Footer from '@components/Footer';
import LoadingState from '@components/LoadingState';
import EmptyState from '@components/EmptyState';
import UserCard from '@components/UserCard';
import ProgressBar from '@components/ProgressBar';
import Banner from '@components/Banner';
import Version from '@components/Version';
import UserUpdateHistory from '@components/UserUpdateHistory';

import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { FontAwesome5 } from '@expo/vector-icons';

import { styles } from './styles';

/**
 * Tela de perfil do usuário com autenticação, resumo da conta
 * e acesso ao fluxo de entrada com Google.
 */
export default function UserProfile() {
  const { colors } = useAppTheme();
  const navigation = useNavigation<RootNavigationProp>();

  const { user } = useAuth();

  const {
    userData,
    isLoading,
    token,
    request,
    promptAsync,
    handleLogout,
  } = useUserProfile();

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.container, { backgroundColor: colors.background }]}>
    
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scroll,
          !token && styles.guest,
        ]}
      >

        {token && userData ? (
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.action}
            >
              <FontAwesome6 name="arrow-left" size={20} iconStyle='solid' color={colors.textPrimary} />
            </TouchableOpacity>

            <View style={styles.wrapper}>
              <Text style={[styles.title, { color: colors.textPrimary }]}>
                {user?.username || ''}
              </Text>
            </View>

            {token ? (
              <TouchableOpacity
                onPress={handleLogout}
                style={styles.action}
              >
                <FontAwesome6 name="arrow-right-to-bracket" size={20} iconStyle='solid' color={colors.textPrimary} />
              </TouchableOpacity>
            ) : (
              <View style={styles.action} />
            )}
          </View>
        ) : null}

        {isLoading ? (
          <LoadingState />
        ) : token ? (
          <View>
            <UserCard userData={userData} />
            <ProgressBar userData={userData} />

            <Banner
                text="Contribua com a comunidade e se destaque!"
                gradientColors={[colors.success, colors.success, colors.primary]}
                logoElement={
                  <Image
                    source={require('@assets/images/user.png')}
                    style={{
                      width: 128,
                      height: 128,
                      resizeMode: 'contain',
                    }}
                  />
                }
              />
            
            {userData?.id ? <UserUpdateHistory userId={userData.id} /> : null}
          </View>
        ) : (
          <View style={styles.body}>
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
              iconLeft={<FontAwesome5 name="google" size={16} />}
              width={'50%'}
            />

            <View style={styles.privacy}>
              <Text style={[styles.text, { color: colors.textSecondary }]}>
                Ao fazer login, você concorda com nossos <Text onPress={() => {navigation.navigate('PrivacyTerms')}} style={[styles.text, { color: colors.primary, textDecorationLine: 'underline' }]}>Termos de Serviço</Text> e <Text onPress={() => {navigation.navigate('PrivacyTerms')}} style={[styles.text, { color: colors.primary, textDecorationLine: 'underline' }]}>Política de Privacidade</Text>.
              </Text>
            </View>
          </View>
        )}

        <Version />
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
}