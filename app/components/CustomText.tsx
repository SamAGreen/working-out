import React, { ReactNode } from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { fontFamilyMap, theme } from '../styling/stylingStandards';

interface CustomTextProps extends TextProps {
    children: ReactNode;
    size?: number;
    color?: string;
    weight?: string;
    style?: TextStyle | TextStyle[];
}

const CustomText: React.FC<CustomTextProps> = ({ children, size = theme.FontSizes.medium, color = theme.Colors.text, weight = theme.FontWeights.medium, style, ...rest }) => {
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
