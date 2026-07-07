import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import { useHeader } from './useHeader';

export default function Header() {
    const { 
        colors, 
        isDark, 
        toggleTheme, 
        displayName, 
        greeting, 
        locationName 
    } = useHeader();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.content}>
                
                {/* Bloco Esquerdo: Textos */}
                <View style={styles.titleContainer} pointerEvents="none">
                    <Text style={[styles.greetingText, { color: colors.textSecondary }]}>
                        {greeting},
                    </Text>
                    <Text style={[styles.title, { color: colors.textPrimary }]}>
                        {displayName}
                    </Text>

                    {/* Indicador de Localização Dinâmico */}
                    <View style={styles.locationRow}>
                        <Feather name="map-pin" size={12} color={colors.primary} />
                        <Text 
                            style={[styles.locationText, { color: colors.primary }]}
                            numberOfLines={1} 
                            ellipsizeMode="tail"
                        >
                            {locationName}
                        </Text>
                    </View>
                </View>

                {/* Bloco Direito: Ações */}
                <View style={styles.actionsContainer}>
                    
                    {/* Botão de Notificações */}
                    <Pressable 
                        style={styles.iconButton}
                        accessibilityRole="button"
                    >
                        <Feather name="bell" size={20} color={colors.textSecondary} />
                        <View style={[styles.notificationBadge, { backgroundColor: colors.danger }]} />
                    </Pressable>

                    {/* Botão de Tema */}
                    <Pressable
                        onPress={toggleTheme}
                        style={({ pressed }) => [
                            styles.themeButton,
                            {
                                backgroundColor: colors.primary + (isDark ? '14' : '0D'),
                                borderColor: colors.primary + '40',
                            },
                            pressed && styles.themeButtonPressed,
                        ]}
                        accessibilityRole="button"
                        accessibilityLabel="Alternar tema"
                    >
                        <Feather
                            name={isDark ? "moon" : "sun"}
                            size={20}
                            color={colors.primary}
                        />
                    </Pressable>
                </View>

            </View>
        </View>
    );
}