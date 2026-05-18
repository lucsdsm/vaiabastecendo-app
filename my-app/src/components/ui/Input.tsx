import React from 'react';
import { StyleProp, StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle } from 'react-native';

import { useAppTheme } from '../../theme/ThemeProvider';
import { radius, spacing, typography } from '../../theme/tokens';

interface InputProps extends TextInputProps {
    prefix?: string;
    suffix?: string;
    containerStyle?: StyleProp<ViewStyle>;
}

/**
 * Campo base com prefixo e sufixo opcionais.
 */
export function Input({ prefix, suffix, containerStyle, style, ...props }: InputProps) {
    const { colors } = useAppTheme();

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: colors.background,
                    borderColor: colors.primary + '40',
                },
                containerStyle,
            ]}
        >
            {prefix ? <Text style={[styles.affix, { color: colors.textSecondary }]}>{prefix}</Text> : null}
            <TextInput
                {...props}
                style={[styles.input, { color: colors.textPrimary }, style]}
                placeholderTextColor={colors.textSecondary + '60'}
            />
            {suffix ? <Text style={[styles.affix, { color: colors.textSecondary }]}>{suffix}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: radius.lg,
        borderWidth: 1.5,
        paddingHorizontal: spacing.xl,
        minHeight: 48,
    },
    input: {
        flex: 1,
        fontSize: typography.size.xl,
        fontWeight: typography.weight.bold,
        textAlign: 'left',
        letterSpacing: typography.letterSpacing.tighter,
    },
    affix: {
        fontSize: typography.size.lg,
        fontWeight: typography.weight.semibold,
    },
});
