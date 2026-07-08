import React from 'react';
import { Animated, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { useToast } from './useToast';
import { styles } from './styles';

export function Toast() {
    const { toastData, translateY, bg, icon, title } = useToast();

    return (
        <Animated.View
            style={[
                styles.container,
                { backgroundColor: bg, transform: [{ translateY }] },
            ]}
        >
            <View style={styles.iconContainer}>
                <Feather name={icon as any} size={18} color="#FFF" />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.message}>{toastData.message}</Text>
            </View>
        </Animated.View>
    );
}
