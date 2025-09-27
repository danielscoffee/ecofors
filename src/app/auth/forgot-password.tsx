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

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleResetPassword = async () => {
    setEmailError('');

    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsEmailSent(true);
    }, 1500);
  };

  const handleBackToLogin = () => {
    router.back();
  };

  if (isEmailSent) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <LinearGradient
          colors={Colors.gradients.nature as any}
          style={styles.backgroundGradient}
        >
          <View style={styles.successContainer}>
            <View style={styles.successContent}>
              <View style={styles.successIconContainer}>
                <Ionicons name="mail" size={60} color={Colors.primary} />
              </View>
              <Text style={styles.successTitle}>Check Your Email</Text>
              <Text style={styles.successMessage}>
                We&apos;ve sent a password reset link to:
              </Text>
              <Text style={styles.emailText}>{email}</Text>
              <Text style={styles.successSubtitle}>
                Click the link in the email to reset your password. 
                If you don&apos;t see it, check your spam folder.
              </Text>
              
              <Button
                title="Back to Sign In"
                onPress={handleBackToLogin}
                variant="primary"
                size="large"
                style={styles.backButton}
              />
              
              <TouchableOpacity
                onPress={() => setIsEmailSent(false)}
                style={styles.resendLink}
              >
                <Text style={styles.resendText}>
                  Didn&apos;t receive the email? Try again
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

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
              <TouchableOpacity onPress={handleBackToLogin} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color={Colors.textLight} />
              </TouchableOpacity>
              <View style={styles.logoContainer}>
                <Ionicons name="lock-closed" size={50} color={Colors.textLight} />
              </View>
              <Text style={styles.title}>Forgot Password?</Text>
              <Text style={styles.subtitle}>
                No worries! Enter your email and we&apos;ll send you a reset link
              </Text>
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
              <View style={styles.form}>
                <Text style={styles.formTitle}>Reset Your Password</Text>
                <Text style={styles.formSubtitle}>
                  Enter your email address and we&apos;ll send you instructions to reset your password
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

                <Button
                  title="Send Reset Link"
                  onPress={handleResetPassword}
                  variant="gradient"
                  size="large"
                  loading={isLoading}
                  style={styles.resetButton}
                />

                <TouchableOpacity
                  onPress={handleBackToLogin}
                  style={styles.backToLogin}
                >
                  <Text style={styles.backToLoginText}>
                    Remember your password? <Text style={styles.signInLinkText}>Sign In</Text>
                  </Text>
                </TouchableOpacity>
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
  },
  header: {
    alignItems: 'center',
    paddingTop: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: Spacing.xl,
    left: Spacing.lg,
    zIndex: 1,
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
    marginTop: Spacing.xl,
  },
  title: {
    ...Typography.h2,
    color: Colors.textLight,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textLight,
    textAlign: 'center',
    opacity: 0.9,
    paddingHorizontal: Spacing.md,
  },
  formContainer: {
    flex: 1,
  },
  form: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: Spacing.xl,
    paddingTop: Spacing.xl,
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
    paddingHorizontal: Spacing.md,
  },
  resetButton: {
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
  },
  backToLogin: {
    alignSelf: 'center',
  },
  backToLoginText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  signInLinkText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  
  // Success styles
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
  },
  successContent: {
    backgroundColor: Colors.background,
    borderRadius: 24,
    padding: Spacing.xl,
    alignItems: 'center',
  },
  successIconContainer: {
    width: 100,
    height: 100,
    backgroundColor: Colors.surface,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  successTitle: {
    ...Typography.h2,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  successMessage: {
    ...Typography.body,
    textAlign: 'center',
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  emailText: {
    ...Typography.body,
    color: Colors.primary,
    fontWeight: '600',
    marginBottom: Spacing.md,
  },
  successSubtitle: {
    ...Typography.bodySmall,
    textAlign: 'center',
    color: Colors.textSecondary,
    marginBottom: Spacing.xl,
    lineHeight: 20,
  },
  resendLink: {
    marginTop: Spacing.lg,
  },
  resendText: {
    ...Typography.bodySmall,
    color: Colors.primary,
    textAlign: 'center',
  },
});