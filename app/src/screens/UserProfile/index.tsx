import React from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import UserCard from '../../components/UserCard';
import ProgressBar from '../../components/ProgressBar';
import Banner from '../../components/Banner';
import Version from '../../components/Version';
import UserUpdateHistory from '../../components/UserUpdateHistory';
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
  } = useUserProfile();

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.container, { backgroundColor: colors.background }]}>

      {!token && styles.scrollContentGuest ? (
      <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.headerActionButton}
          >
            <FontAwesome6 name="arrow-left" size={20} iconStyle='solid' color={colors.textPrimary} />
          </TouchableOpacity>
      </View>
      ) : null}
    
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          !token && styles.scrollContentGuest,
        ]}
      >

        {token && userData ? (
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.headerActionButton}
            >
              <FontAwesome6 name="arrow-left" size={20} iconStyle='solid' color={colors.textPrimary} />
            </TouchableOpacity>

            <View style={styles.headerTitleContainer}>
              <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
                {user?.username || ''}
              </Text>
            </View>

            {token ? (
              <TouchableOpacity
                onPress={handleLogout}
                style={styles.headerActionButton}
              >
                <FontAwesome6 name="arrow-right-to-bracket" size={20} iconStyle='solid' color={colors.textPrimary} />
              </TouchableOpacity>
            ) : (
              <View style={styles.headerActionButton} />
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
                    source={require('../../../assets/images/user.png')}
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

        <Version />
      </ScrollView>
    </SafeAreaView>
  );
}