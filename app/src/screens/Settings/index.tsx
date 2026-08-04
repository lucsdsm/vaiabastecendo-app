import React from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from 'react-native';

import { useSettings } from './useSettings';

import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppTheme } from '../../theme/ThemeProvider';

import { styles } from './styles';

import Version from '../../components/Version';

/**
 * Tela de configurações do aplicativo.
 */

export default function Settings() {
    const { colors } = useAppTheme();
    const navigation = useNavigation();
    const { isDark, toggleTheme } = useSettings();

    return (
        <SafeAreaView
          edges={['top']}
          style={[styles.container, { backgroundColor: colors.background }]}>
    
          <View style={styles.header}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.headerActionButton}
              >
                <FontAwesome6 name="arrow-left" size={20} iconStyle='solid' color={colors.textPrimary} />
              </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.scrollContent]}>

                <Pressable
                    onPress={toggleTheme}
                    style={({ pressed }) => [
                        styles.settingsButton,
                        {
                            backgroundColor: colors.primary + (isDark ? '14' : '0D'),
                            borderColor: colors.primary + '40',
                        },
                        pressed && { opacity: 0.6 },
                    ]}
                    accessibilityRole="button"
                    accessibilityLabel="Alternar tema"
                >
                    <Text style={[styles.settingsButtonText, { color: colors.textPrimary }]}>
                        Alternar tema
                    </Text>

                    <FontAwesome6
                        name={isDark ? 'moon' : 'sun'}
                        size={20}
                        iconStyle='solid'
                        color={colors.primary}
                    />         
                </Pressable>

                

          </ScrollView>
          <Version />
        </SafeAreaView>
    );
}
        