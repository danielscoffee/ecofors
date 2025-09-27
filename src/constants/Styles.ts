import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "./Colors";

const { width, height } = Dimensions.get("window");

export const Layout = {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  isLargeDevice: width >= 414,
};

export const Typography = StyleSheet.create({
  // Headers
  h1: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.text,
    lineHeight: 40,
  },
  h2: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.text,
    lineHeight: 36,
  },
  h3: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.text,
    lineHeight: 32,
  },
  h4: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.text,
    lineHeight: 28,
  },

  // Body text
  body: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
  },
  bodyLarge: {
    fontSize: 18,
    color: Colors.text,
    lineHeight: 26,
  },
  bodySmall: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },

  // Special text
  caption: {
    fontSize: 12,
    color: Colors.textMuted,
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  link: {
    fontSize: 16,
    color: Colors.primary,
    textDecorationLine: "underline",
  },
});

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 50,
};

export const Shadows = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  large: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4,
  },
};

export default {
  Layout,
  Typography,
  Spacing,
  BorderRadius,
  Shadows,
};

