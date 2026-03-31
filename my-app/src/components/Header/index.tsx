import React from 'react';
import { StyleSheet, View, Text, Image, Platform, TouchableOpacity } from 'react-native';

import Constants from 'expo-constants'; 
import { useAppTheme } from '../../theme/ThemeProvider';

import { Feather } from '@expo/vector-icons';

export default function Header() {
    const { colors, isDark, toggleTheme } = useAppTheme();
    
    const statusBarHeight = Constants.statusBarHeight;

    return (
        <View style={[
            styles.container,
            {
                backgroundColor: colors.surface,
                paddingTop: statusBarHeight + 15,
                borderBottomLeftRadius: 24,
                borderBottomRightRadius: 24
            }
        ]}>
            <View style={styles.content}>

                <View style={styles.titleContainer} pointerEvents="none">
                    <Text style={[styles.title, { color: colors.textPrimary }]}>
                        Carnolina
                    </Text>
                </View>

                <Image 
                    source={require('../../../assets/logo.png')} 
                    style={styles.logo} 
                    resizeMode="contain"
                />

                <TouchableOpacity 
                    onPress={toggleTheme} 
                    activeOpacity={0.3}
                    style={styles.themeButton}
                >
                    <Feather 
                        name={isDark ? "sun" : "moon"} 
                        size={24} 
                        color={colors.textPrimary} 
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 20,
        paddingBottom: 10, 

        ...Platform.select({
        ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
        },
        android: {
            elevation: 4,
        },
        }),

        zIndex: 10,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    
    logo: {
        width: 64,
        height: 64,
    },
    titleContainer: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        fontFamily: 'StoryScript_400Regular',
    },
    themeButton: {
        padding: 10,
    },
});

