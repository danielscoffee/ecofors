import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";

export default function Index() {
  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        // WARN: THIS IS JUST A PLACEHOLDER
        // In a real app, you would check:
        // 1. If user is authenticated (check token, async storage, etc.)
        // 2. If user has completed onboarding
        // 3. Route accordingly

        // For demo purposes, we'll simulate a brief loading time then navigate to login
        setTimeout(() => {
          router.replace("/auth/login");
        }, 2000);
      } catch (error) {
        console.error("Error checking user status:", error);
        router.replace("/auth/login");
      }
    };

    checkUserStatus();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={Colors.gradients.primary as any}
        style={styles.gradient}
      >
        <View style={styles.logoContainer}>
          <View style={styles.iconWrapper}>
            <Ionicons name="leaf" size={80} color={Colors.textLight} />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    width: 150,
    height: 150,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 75,
    alignItems: "center",
    justifyContent: "center",
  },
});
