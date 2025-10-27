import React from "react";
import { TextInput, TextInputProps, TextStyle } from "react-native";
import { fontFamilyMap, theme } from "../styling/stylingStandards";

interface CustomTextInputProps extends TextInputProps {
  size?: number;
  color?: string;
  weight?: string;
  style?: TextStyle | TextStyle[];
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  size = theme.FontSizes.medium,
  color = theme.Colors.text,
  weight = theme.FontWeights.medium,
  style,
  ...rest
}) => {
  return (
    <TextInput
      style={[
        { fontFamily: fontFamilyMap[weight], fontSize: size, color },
        style,
      ]}
      placeholderTextColor={theme.Colors.text_800}
      {...rest}
    />
  );
};

export default CustomTextInput;
