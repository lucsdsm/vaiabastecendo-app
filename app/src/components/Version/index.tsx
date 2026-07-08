import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { useAppTheme } from '../../theme/ThemeProvider';
import { styles } from './styles';

export default function Version() {
    const { colors } = useAppTheme();
    
    const currentYear = new Date().getFullYear();
    
    const appVersion = Constants.expoConfig?.version || '1.0.0';

    return (
        <View style={[styles.container]}>
            <Text style={[styles.appName, { color: colors.textPrimary }]}>
                Vai Abastecendo
            </Text>
            
            <Text style={[styles.version, { color: colors.textSecondary }]}>
                Versão {appVersion}
            </Text>
            
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