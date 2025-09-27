import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Colors } from '../../constants/Colors';
import { Typography, Spacing } from '../../constants/Styles';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    let isValid = true;

    // Reset errors
    setEmailError('');
    setPasswordError('');

    // Validate email
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    // Validate password
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    if (!isValid) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to onboarding or home based on user status
      router.push('/onboarding');
    }, 1500);
  };

  const handleSignUp = () => {
    router.push('./signup');
  };

  const handleForgotPassword = () => {
    router.push('./forgot-password');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={Colors.gradients.nature as any}
        style={styles.backgroundGradient}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Ionicons name="leaf" size={60} color={Colors.textLight} />
              </View>
              <Text style={styles.title}>EcoFors</Text>
              <Text style={styles.subtitle}>
                Empowering Schools for a Greener Future
              </Text>
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
              <View style={styles.form}>
                <Text style={styles.formTitle}>Welcome Back!</Text>
                <Text style={styles.formSubtitle}>
                  Sign in to continue your ecology journey
                </Text>

                <Input
                  label="Email Address"
                  value={email}
                  onChangeText={setEmail}
                  error={emailError}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  icon="mail"
                />

                <Input
                  label="Password"
                  value={password}
                  onChangeText={setPassword}
                  error={passwordError}
                  placeholder="Enter your password"
                  secureTextEntry
                  icon="lock-closed"
                />

                <TouchableOpacity
                  onPress={handleForgotPassword}
                  style={styles.forgotPassword}
                >
                  <Text style={styles.forgotPasswordText}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>

                <Button
                  title="Sign In"
                  onPress={handleLogin}
                  variant="primary"
                  size="large"
                  loading={isLoading}
                  style={styles.loginButton}
                />

                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>or</Text>
                  <View style={styles.dividerLine} />
                </View>

                <Button
                  title="Create New Account"
                  onPress={handleSignUp}
                  variant="outline"
                  size="large"
                  style={styles.signupButton}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
  },
  header: {
    alignItems: 'center',
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.xl,
  },
  logoContainer: {
    width: 100,
    height: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    ...Typography.h1,
    color: Colors.textLight,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textLight,
    textAlign: 'center',
    opacity: 0.9,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  form: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: Spacing.xl,
    paddingTop: Spacing.xxl,
  },
  formTitle: {
    ...Typography.h3,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  formSubtitle: {
    ...Typography.bodySmall,
    textAlign: 'center',
    color: Colors.textSecondary,
    marginBottom: Spacing.xl,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: Spacing.lg,
  },
  forgotPasswordText: {
    ...Typography.bodySmall,
    color: Colors.primary,
    fontWeight: '600',
  },
  loginButton: {
    marginBottom: Spacing.lg,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginHorizontal: Spacing.md,
  },
  signupButton: {
    backgroundColor: Colors.background,
    borderColor: Colors.primary,
  },
});