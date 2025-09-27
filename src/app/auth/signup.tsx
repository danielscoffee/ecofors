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

export default function SignUpScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [role, setRole] = useState('');
  
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = async () => {
    const newErrors: {[key: string]: string} = {};

    // Validate all fields
    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!schoolName.trim()) newErrors.schoolName = 'School name is required';
    if (!role.trim()) newErrors.role = 'Role is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to onboarding
      router.replace('/onboarding');
    }, 2000);
  };

  const handleSignIn = () => {
    router.back();
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
              <TouchableOpacity onPress={handleSignIn} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color={Colors.textLight} />
              </TouchableOpacity>
              <View style={styles.logoContainer}>
                <Ionicons name="leaf" size={50} color={Colors.textLight} />
              </View>
              <Text style={styles.title}>Join EcoFors</Text>
              <Text style={styles.subtitle}>
                Start your school&apos;s ecology journey today
              </Text>
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
              <View style={styles.form}>
                <Text style={styles.formTitle}>Create Account</Text>
                <Text style={styles.formSubtitle}>
                  Fill in your details to get started
                </Text>

                <View style={styles.nameRow}>
                  <View style={styles.nameField}>
                    <Input
                      label="First Name"
                      value={firstName}
                      onChangeText={setFirstName}
                      error={errors.firstName}
                      placeholder="First name"
                      icon="person"
                    />
                  </View>
                  <View style={styles.nameField}>
                    <Input
                      label="Last Name"
                      value={lastName}
                      onChangeText={setLastName}
                      error={errors.lastName}
                      placeholder="Last name"
                      icon="person"
                    />
                  </View>
                </View>

                <Input
                  label="Email Address"
                  value={email}
                  onChangeText={setEmail}
                  error={errors.email}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  icon="mail"
                />

                <Input
                  label="School Name"
                  value={schoolName}
                  onChangeText={setSchoolName}
                  error={errors.schoolName}
                  placeholder="Enter your school name"
                  icon="school"
                />

                <Input
                  label="Role"
                  value={role}
                  onChangeText={setRole}
                  error={errors.role}
                  placeholder="Teacher, Administrator, etc."
                  icon="briefcase"
                />

                <Input
                  label="Password"
                  value={password}
                  onChangeText={setPassword}
                  error={errors.password}
                  placeholder="Create a password"
                  secureTextEntry
                  icon="lock-closed"
                />

                <Input
                  label="Confirm Password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  error={errors.confirmPassword}
                  placeholder="Confirm your password"
                  secureTextEntry
                  icon="lock-closed"
                />

                <Button
                  title="Create Account"
                  onPress={handleSignUp}
                  variant="gradient"
                  size="large"
                  loading={isLoading}
                  style={styles.signupButton}
                />

                <TouchableOpacity
                  onPress={handleSignIn}
                  style={styles.signInLink}
                >
                  <Text style={styles.signInText}>
                    Already have an account? <Text style={styles.signInLinkText}>Sign In</Text>
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
    marginBottom: Spacing.lg,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameField: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  signupButton: {
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
  },
  signInLink: {
    alignSelf: 'center',
  },
  signInText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  signInLinkText: {
    color: Colors.primary,
    fontWeight: '600',
  },
});