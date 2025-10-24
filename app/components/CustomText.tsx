// components/AppText.tsx
import React, { ReactNode } from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { theme } from '../styling/stylingStandards';

type FontWeight = '400' | '500' | '700';

interface CustomTextProps extends TextProps {
    children: ReactNode;
    size?: number;
    color?: string;
    weight?: string;
    style?: TextStyle | TextStyle[];
}

const CustomText: React.FC<CustomTextProps> = ({ children, size = theme.FontSizes.medium, color = theme.Colors.text, weight = theme.FontWeights.medium, style, ...rest }) => {
    const fontFamilyMap: Record<string, string> = {
        '400': 'Orbitron_400Regular',
        '500': 'Orbitron_500Medium',
        '700': 'Orbitron_700Bold',
    };

    return (
        <Text
            style={[{ fontFamily: fontFamilyMap[weight], fontSize: size, color }, style]}
            {...rest}
        >
            {children}
        </Text>
    );
};

export default CustomText;
