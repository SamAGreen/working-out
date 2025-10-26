import { LinearGradient } from 'expo-linear-gradient';
import React, { ReactNode, useEffect, useRef } from 'react';
import { Animated, ColorValue, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../styling/stylingStandards';

interface AnimatedScreenWrapperProps {
    children: ReactNode;
    style?: ViewStyle | ViewStyle[];
    active?: boolean;
}

const AnimatedScreenWrapper: React.FC<AnimatedScreenWrapperProps> = ({
    children,
    style,
    active = false,
}) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: active ? 1 : 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [active]);

    const backgroundColors: [ColorValue, ColorValue, ...ColorValue[]] = [
        theme.Colors.background_500,
        theme.Colors.background_100,
        theme.Colors.background_50,
        theme.Colors.background,
    ];

    const primaryColors: [ColorValue, ColorValue, ...ColorValue[]] = [
        theme.Colors.primary,
        theme.Colors.primary_100,
        theme.Colors.primary_50,
        theme.Colors.primary_30,
    ];

    return (
        <SafeAreaView style={[styles.safeArea, style]} edges={['top', 'left', 'right']}>
            <LinearGradient colors={backgroundColors} style={StyleSheet.absoluteFillObject} />
            <Animated.View style={[StyleSheet.absoluteFill, { opacity: fadeAnim }]}>
                <LinearGradient colors={primaryColors} style={StyleSheet.absoluteFillObject} />
            </Animated.View>
            {children}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        paddingTop: theme.Spacing.md,
        paddingHorizontal: theme.Spacing.md,
    },
});

export default AnimatedScreenWrapper;
