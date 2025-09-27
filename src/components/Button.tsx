import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { Colors } from "../constants/Colors";
import { BorderRadius, Shadows, Typography } from "../constants/Styles";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "gradient";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const buttonStyle = [
    styles.base,
    styles[size],
    styles[variant],
    disabled && styles.disabled,
    style,
  ];

  const textStyleCombined = [
    Typography.button,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  if (variant === "gradient") {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={[styles.base, styles[size], styles.gradient, style]}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={Colors.gradients.primary as any}
          style={[styles.base, styles[size]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          {loading ? (
            <ActivityIndicator color={Colors.textLight} size="small" />
          ) : (
            <Text
              style={[
                Typography.button,
                styles.gradientText,
                styles[`${size}Text`],
                textStyle,
              ]}
            >
              {title}
            </Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "outline" ? Colors.primary : Colors.textLight}
          size="small"
        />
      ) : (
        <Text style={textStyleCombined}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: BorderRadius.md,
    justifyContent: "center",
    alignItems: "center",
  },

  small: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    minHeight: 28,
  },
  medium: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minHeight: 32,
  },
  large: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    minHeight: 38,
  },

  primary: {
    backgroundColor: Colors.primary,
    ...Shadows.small,
  },
  secondary: {
    backgroundColor: Colors.secondary,
    ...Shadows.small,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  gradient: {
    backgroundColor: "transparent",
    ...Shadows.small,
  },

  primaryText: {
    color: Colors.textLight,
  },
  secondaryText: {
    color: Colors.textLight,
  },
  outlineText: {
    color: Colors.primary,
  },
  gradientText: {
    color: Colors.textLight,
  },

  smallText: {
    fontSize: 12,
  },
  mediumText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 16,
  },

  disabled: {
    opacity: 0.6,
    backgroundColor: Colors.textMuted,
    shadowOpacity: 0,
  },
  disabledText: {
    color: Colors.textLight,
  },
});

