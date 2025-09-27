import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../../components/Button';
import { Colors } from '../../constants/Colors';
import { Typography, Spacing } from '../../constants/Styles';
import { useI18n } from '../../contexts/I18nContext';

const { width } = Dimensions.get('window');

interface OnboardingStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  gradient: string[];
  facts: string[];
}

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const { t } = useI18n();

  // Create steps using translations
  const onboardingSteps: OnboardingStep[] = [
    {
      id: 1,
      title: t('onboarding.welcome.title'),
      subtitle: t('onboarding.welcome.subtitle'),
      description: t('onboarding.welcome.description'),
      icon: 'leaf',
      gradient: Colors.gradients.primary,
      facts: [
        '🌱 Over 50,000 schools already using EcoFors',
        '🌍 Present in 45+ countries worldwide',
        '📚 Curriculum-aligned ecology lessons'
      ]
    },
    {
      id: 2,
      title: t('onboarding.ecosystems.title'),
      subtitle: t('onboarding.ecosystems.subtitle'),
      description: t('onboarding.ecosystems.description'),
      icon: 'earth',
      gradient: Colors.gradients.secondary,
      facts: [
        '🦋 Discover biodiversity patterns',
        '🌳 Understand food webs and chains',
        '💧 Learn about water and carbon cycles'
      ]
    },
    {
      id: 3,
      title: t('onboarding.evaluation.title'),
      subtitle: t('onboarding.evaluation.subtitle'),
      description: t('onboarding.evaluation.description'),
      icon: 'thermometer',
      gradient: Colors.gradients.sunset,
      facts: [
        '♻️ Reduce school waste by 40%',
        '⚡ Save energy with smart monitoring',
        '🌿 Start your school garden project'
      ]
    },
    {
      id: 4,
      title: t('onboarding.rankings.title'),
      subtitle: t('onboarding.rankings.subtitle'),
      description: t('onboarding.rankings.description'),
      icon: 'analytics',
      gradient: Colors.gradients.nature,
      facts: [
        '📊 Real-time impact dashboards',
        '🏆 Earn sustainability badges',
        '📈 Compare with other schools globally'
      ]
    },
    {
      id: 5,
      title: t('onboarding.ready.title'),
      subtitle: t('onboarding.ready.subtitle'),
      description: t('onboarding.ready.description'),
      icon: 'rocket',
      gradient: Colors.gradients.primary,
      facts: [
        '🎯 Set your first eco-goal',
        '👥 Build your green team',
        '🌟 Inspire your community'
      ]
    }
  ];

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      scrollViewRef.current?.scrollTo({
        x: nextStep * width,
        animated: true,
      });
    } else {
      // Navigate to home screen
      router.replace('/home' as any);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      scrollViewRef.current?.scrollTo({
        x: prevStep * width,
        animated: true,
      });
    }
  };

  const handleSkip = () => {
    router.replace('/home' as any);
  };

  const handleDotPress = (index: number) => {
    setCurrentStep(index);
    scrollViewRef.current?.scrollTo({
      x: index * width,
      animated: true,
    });
  };

  const currentStepData = onboardingSteps[currentStep];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar style="light" />
      <LinearGradient
        colors={currentStepData.gradient as any}
        style={styles.backgroundGradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {currentStep > 0 && (
              <TouchableOpacity onPress={handlePrevious} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color={Colors.textLight} />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.headerCenter}>
            <Text style={styles.stepIndicator}>
              {currentStep + 1} {t('onboarding.of')} {onboardingSteps.length}
            </Text>
          </View>
          <View style={styles.headerRight}>
            {currentStep < onboardingSteps.length - 1 && (
              <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
                <Text style={styles.skipText}>{t('common.skip')}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Content */}
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          style={styles.scrollView}
        >
          {onboardingSteps.map((step, index) => (
            <View key={step.id} style={styles.stepContainer}>
              <View style={styles.stepContent}>
                {/* Icon */}
                <View style={styles.iconContainer}>
                  <Ionicons name={step.icon} size={80} color={Colors.textLight} />
                </View>

                {/* Text Content */}
                <View style={styles.textContent}>
                  <Text style={styles.title}>{step.title}</Text>
                  <Text style={styles.subtitle}>{step.subtitle}</Text>
                  <Text style={styles.description}>{step.description}</Text>

                  {/* Facts */}
                  <View style={styles.factsContainer}>
                    {step.facts.map((fact, factIndex) => (
                      <View key={factIndex} style={styles.factItem}>
                        <Text style={styles.factText}>{fact}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomContainer}>
          {/* Dots Indicator */}
          <View style={styles.dotsContainer}>
            {onboardingSteps.map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleDotPress(index)}
                style={[
                  styles.dot,
                  currentStep === index && styles.activeDot,
                ]}
              />
            ))}
          </View>

          {/* Action Button */}
          <Button
            title={currentStep === onboardingSteps.length - 1 ? t('common.getStarted') : t('common.next')}
            onPress={handleNext}
            variant="outline"
            size="large"
            style={styles.nextButton}
            textStyle={styles.nextButtonText}
          />
        </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  headerLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  backButton: {
    padding: Spacing.sm,
  },
  stepIndicator: {
    ...Typography.bodySmall,
    color: Colors.textLight,
    fontWeight: '600',
  },
  skipButton: {
    padding: Spacing.sm,
  },
  skipText: {
    ...Typography.body,
    color: Colors.textLight,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  stepContainer: {
    width,
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  stepContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 160,
    height: 160,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xxl,
  },
  textContent: {
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  title: {
    ...Typography.h1,
    color: Colors.textLight,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.h4,
    color: Colors.textLight,
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: Spacing.md,
  },
  description: {
    ...Typography.body,
    color: Colors.textLight,
    textAlign: 'center',
    opacity: 0.8,
    marginBottom: Spacing.xl,
    lineHeight: 24,
  },
  factsContainer: {
    alignSelf: 'stretch',
  },
  factItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  factText: {
    ...Typography.body,
    color: Colors.textLight,
    textAlign: 'center',
    fontWeight: '500',
  },
  bottomContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: Colors.textLight,
    width: 24,
  },
  nextButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: Colors.textLight,
    borderWidth: 2,
  },
  nextButtonText: {
    color: Colors.textLight,
    fontWeight: '600',
  },
});