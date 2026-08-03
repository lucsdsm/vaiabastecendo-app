import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { styles } from './styles';
import { useVersion } from './useVersion';

export default function Version() {
    const { 
        colors, 
        currentYear, 
        appVersion, 
        isDark,
        handleEmailSupport,
        handleOpenLink
    } = useVersion();

    return (
        <View style={styles.container}>
            <Text style={[styles.appName, { color: colors.textPrimary }]}>
                Vai Abastecendo
            </Text>
            
            <Text style={[styles.version, { color: colors.textSecondary }]}>
                Versão {appVersion}
            </Text>

            {/* Bloco de Redes Sociais / Contato */}
            <View style={styles.socialContainer}>
                <Pressable
                    onPress={() => handleOpenLink('https://www.linkedin.com/in/lucas-eduardo-84485359/')}
                    style={({ pressed }) => [
                        styles.socialButton, 
                        {
                            backgroundColor: colors.primary + (isDark ? '14' : '0D'),
                            borderColor: colors.primary + '40',
                        },
                        pressed && { opacity: 0.6 }, 
                    ]}
                    accessibilityRole="button"
                    accessibilityLabel="Acessar LinkedIn"
                >
                    <FontAwesome name="linkedin" size={20} color={colors.primary} />
                </Pressable>

                <Pressable
                    onPress={handleEmailSupport}
                    style={({ pressed }) => [
                        styles.socialButton,
                        {
                            backgroundColor: colors.primary + (isDark ? '14' : '0D'),
                            borderColor: colors.primary + '40',
                        },
                        pressed && { opacity: 0.6 },
                    ]}
                    accessibilityRole="button"
                    accessibilityLabel="Enviar Email"
                >
                    <FontAwesome6 name="envelope" size={22} iconStyle='solid' color={colors.primary} />
                </Pressable>
            </View>
            
            <View style={styles.copyrightContainer}>
                <Text style={[styles.text, { color: colors.textSecondary }]}>
                    © {currentYear} Vai Abastecendo.
                </Text>
                <Text style={[styles.text, { color: colors.textSecondary }]}>
                    Todos os direitos reservados.
                </Text>
            </View>
        </View>
    );
}