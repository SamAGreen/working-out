import { LinearGradient } from 'expo-linear-gradient';
import React, { ReactNode } from 'react';
import { ColorValue, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../styling/stylingStandards';

interface ScreenWrapperProps {
    children: ReactNode;
    style?: ViewStyle | ViewStyle[];
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children, style }) => {
    const colors: [ColorValue, ColorValue, ...ColorValue[]] = [
        theme.Colors.background_500,
        theme.Colors.background_100,
        theme.Colors.background_50,
        theme.Colors.background,
    ];

    return (
        <LinearGradient colors={colors} style={styles.gradient}>
            <SafeAreaView style={[styles.safeArea, style]} edges={['top', 'left', 'right']}>
                {children}
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
        paddingTop: theme.Spacing.md,
        paddingHorizontal: theme.Spacing.md,
    },
});

export default ScreenWrapper;
