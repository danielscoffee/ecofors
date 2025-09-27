import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Colors } from "../constants/Colors";
import { BorderRadius, Spacing, Typography } from "../constants/Styles";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  secureTextEntry?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  secureTextEntry,
  containerStyle,
  inputStyle,
  ...textInputProps
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          error && styles.inputContainerError,
        ]}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={
              error
                ? Colors.error
                : isFocused
                  ? Colors.primary
                  : Colors.textMuted
            }
            style={styles.icon}
          />
        )}

        <TextInput
          style={[styles.input, inputStyle]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={isSecure}
          placeholderTextColor={Colors.textMuted}
          {...textInputProps}
        />

        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsSecure(!isSecure)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={isSecure ? "eye-off" : "eye"}
              size={20}
              color={Colors.textMuted}
            />
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    ...Typography.bodySmall,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.md,
    minHeight: 48,
  },
  inputContainerFocused: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  inputContainerError: {
    borderColor: Colors.error,
  },
  icon: {
    marginRight: Spacing.sm,
  },
  input: {
    ...Typography.body,
    flex: 1,
    padding: 0,
    color: Colors.text,
  },
  eyeIcon: {
    padding: Spacing.xs,
    marginLeft: Spacing.sm,
  },
  errorText: {
    ...Typography.caption,
    color: Colors.error,
    marginTop: Spacing.xs,
  },
});

