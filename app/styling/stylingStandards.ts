const Colors = {
  accent: "#FFCA38",
  accent_100: "#FFF1CC",
  primary: "#FF8FAB",
  primary_30: "#FFF0F4",
  primary_50: "#FFE5EC",
  primary_100: "#FFCCD9",
  primary_200: "#FF99B3",
  background: "#F3FCFF",
  background_50: "#E5F9FF",
  background_100: "#CCF2FF",
  background_500: "#00BFFF",
  background_800: "#004D66",
  error: "#BF0603",
  text: "#1B1204",
  text_800: "#593C0D",
};

const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

const FontSizes = {
  small: 12,
  medium: 16,
  large: 20,
  xl: 24,
  xxl: 28,
  xxxl: 32,
};

const Radius = {
  sm: 4,
  md: 8,
  lg: 16,
};

const FontWeights = {
  regular: "400",
  medium: "500",
  bold: "700",
};

export const theme = {
  Colors,
  Spacing,
  FontSizes,
  Radius,
  FontWeights,
};

export type Theme = typeof theme;

export const fontFamilyMap: Record<string, string> = {
  "400": "Orbitron_400Regular",
  "500": "Orbitron_500Medium",
  "700": "Orbitron_700Bold",
};
