import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../../components/Button';
import { Colors } from '../../constants/Colors';
import { BorderRadius, Shadows, Spacing, Typography } from '../../constants/Styles';
import { useI18n } from '../../contexts/I18nContext';

interface ClassData {
  id: string;
  name: string;
  grade: string;
  teacher: string;
}

interface EvaluationCriteria {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  weight: number;
}

const classes: ClassData[] = [
  { id: '1', name: 'Class 5A', grade: '5th Grade', teacher: 'Mrs. Silva' },
  { id: '2', name: 'Class 5B', grade: '5th Grade', teacher: 'Mr. Santos' },
  { id: '3', name: 'Class 6A', grade: '6th Grade', teacher: 'Ms. Oliveira' },
  { id: '4', name: 'Class 6B', grade: '6th Grade', teacher: 'Mr. Costa' },
  { id: '5', name: 'Class 7A', grade: '7th Grade', teacher: 'Mrs. Lima' },
  { id: '6', name: 'Class 7B', grade: '7th Grade', teacher: 'Mr. Pereira' },
];

export default function EvaluationScreen() {
  const { t } = useI18n();

  const evaluationCriteria: EvaluationCriteria[] = [
    {
      id: 'classroom_clean',
      title: t('evaluation.criteria.cleanliness'),
      description: t('evaluation.criteria.cleanlinessDesc'),
      icon: 'home',
      weight: 25,
    },
    {
      id: 'school_areas',
      title: t('evaluation.criteria.commonAreas'),
      description: t('evaluation.criteria.commonAreasDesc'),
      icon: 'business',
      weight: 20,
    },
    {
      id: 'garbage_sorting',
      title: t('evaluation.criteria.garbageSorting'),
      description: t('evaluation.criteria.garbageSortingDesc'),
      icon: 'layers',
      weight: 30,
    },
    {
      id: 'sustainability',
      title: t('evaluation.criteria.sustainability'),
      description: t('evaluation.criteria.sustainabilityDesc'),
      icon: 'leaf',
      weight: 25,
    },
  ];

  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [scores, setScores] = useState<{ [key: string]: number }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClassSelect = (classId: string) => {
    setSelectedClass(classId);
    setScores({});
  };

  const handleScoreSelect = (criteriaId: string, score: number) => {
    setScores(prev => ({
      ...prev,
      [criteriaId]: score,
    }));
  };

  const calculateGarbageIndex = () => {
    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
    const maxScore = evaluationCriteria.length * 5;
    return Math.round((totalScore / maxScore) * 100);
  };

  const handleSubmitEvaluation = async () => {
    if (!selectedClass || Object.keys(scores).length !== evaluationCriteria.length) {
      Alert.alert(
        t('evaluation.incompleteEvaluation'), 
        t('evaluation.incompleteMessage')
      );
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const garbageIndex = calculateGarbageIndex();
      const selectedClassData = classes.find(c => c.id === selectedClass);
      
      Alert.alert(
        t('evaluation.submitted'),
        `${selectedClassData?.name} ${t('evaluation.submittedMessage')} ${garbageIndex}/100`,
        [
          { text: t('evaluation.viewRankings'), onPress: () => router.push('/rankings' as any) },
          { text: t('evaluation.evaluateAnother'), onPress: () => { setSelectedClass(null); setScores({}); } },
          { text: t('evaluation.backToHome'), onPress: () => router.back() },
        ]
      );
      
      setIsSubmitting(false);
    }, 1500);
  };

  const ScoreButton = ({ score, selected, onPress }: { score: number; selected: boolean; onPress: () => void }) => (
    <TouchableOpacity
      style={[
        styles.scoreButton,
        selected && styles.scoreButtonSelected,
        { backgroundColor: selected ? Colors.primary : Colors.surface }
      ]}
      onPress={onPress}
    >
      <Text style={[
        styles.scoreButtonText,
        { color: selected ? Colors.textLight : Colors.text }
      ]}>
        {score}
      </Text>
    </TouchableOpacity>
  );

  const CriteriaCard = ({ criteria }: { criteria: EvaluationCriteria }) => (
    <View style={styles.criteriaCard}>
      <View style={styles.criteriaHeader}>
        <View style={[styles.criteriaIcon, { backgroundColor: Colors.primary + '20' }]}>
          <Ionicons name={criteria.icon} size={24} color={Colors.primary} />
        </View>
        <View style={styles.criteriaInfo}>
          <Text style={styles.criteriaTitle}>{criteria.title}</Text>
          <Text style={styles.criteriaDescription}>{criteria.description}</Text>
          <Text style={styles.criteriaWeight}>{t('evaluation.weight')} {criteria.weight}%</Text>
        </View>
      </View>
      
      <View style={styles.scoreSection}>
        <Text style={styles.scoreLabel}>{t('evaluation.rateLabel')}</Text>
        <View style={styles.scoreButtons}>
          {[1, 2, 3, 4, 5].map(score => (
            <ScoreButton
              key={score}
              score={score}
              selected={scores[criteria.id] === score}
              onPress={() => handleScoreSelect(criteria.id, score)}
            />
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar style="light" />
      
      {/* Header */}
      <LinearGradient
        colors={Colors.gradients.primary as any}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={Colors.textLight} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('evaluation.title')}</Text>
          <View style={styles.headerRight} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Class Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('evaluation.selectClassTitle')}</Text>
          <View style={styles.classGrid}>
            {classes.map(classItem => (
              <TouchableOpacity
                key={classItem.id}
                style={[
                  styles.classCard,
                  selectedClass === classItem.id && styles.classCardSelected
                ]}
                onPress={() => handleClassSelect(classItem.id)}
              >
                <Text style={[
                  styles.className,
                  selectedClass === classItem.id && styles.classNameSelected
                ]}>
                  {classItem.name}
                </Text>
                <Text style={[
                  styles.classGrade,
                  selectedClass === classItem.id && styles.classGradeSelected
                ]}>
                  {classItem.grade}
                </Text>
                <Text style={[
                  styles.classTeacher,
                  selectedClass === classItem.id && styles.classTeacherSelected
                ]}>
                  {classItem.teacher}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Evaluation Criteria */}
        {selectedClass && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {t('evaluation.criteriaTitle')} {classes.find(c => c.id === selectedClass)?.name}
            </Text>
            
            {evaluationCriteria.map(criteria => (
              <CriteriaCard key={criteria.id} criteria={criteria} />
            ))}

            {/* Garbage Index Preview */}
            {Object.keys(scores).length > 0 && (
              <View style={styles.indexPreview}>
                <Text style={styles.indexTitle}>{t('evaluation.currentIndex')}</Text>
                <Text style={styles.indexValue}>{calculateGarbageIndex()}/100</Text>
                <View style={styles.indexBar}>
                  <View 
                    style={[
                      styles.indexFill,
                      { width: `${calculateGarbageIndex()}%` }
                    ]} 
                  />
                </View>
              </View>
            )}

            {/* Submit Button */}
            <Button
              title={t('evaluation.submitEvaluation')}
              onPress={handleSubmitEvaluation}
              variant="gradient"
              size="large"
              loading={isSubmitting}
              disabled={Object.keys(scores).length !== evaluationCriteria.length}
              style={styles.submitButton}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  header: {
    paddingTop: 8,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: Spacing.sm,
  },
  headerTitle: {
    ...Typography.h3,
    color: Colors.textLight,
    flex: 1,
    textAlign: 'center',
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  section: {
    marginTop: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.h4,
    marginBottom: Spacing.lg,
  },
  classGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  classCard: {
    width: '50%',
    paddingHorizontal: 6,
    marginBottom: 8,
    backgroundColor: Colors.background,
    borderRadius: 6,
    padding: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    ...Shadows.small,
  },
  classCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '10',
  },
  className: {
    ...Typography.body,
    fontWeight: '600',
    textAlign: 'center',
  },
  classNameSelected: {
    color: Colors.primary,
  },
  classGrade: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
  classGradeSelected: {
    color: Colors.primary,
  },
  classTeacher: {
    ...Typography.caption,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
  classTeacherSelected: {
    color: Colors.primary,
  },
  criteriaCard: {
    backgroundColor: Colors.background,
    borderRadius: 6,
    padding: 12,
    marginBottom: 8,
    ...Shadows.small,
  },
  criteriaHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  criteriaIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  criteriaInfo: {
    flex: 1,
  },
  criteriaTitle: {
    ...Typography.body,
    fontWeight: '600',
    marginBottom: 2,
  },
  criteriaDescription: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  criteriaWeight: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '600',
  },
  scoreSection: {
    marginTop: 8,
  },
  scoreLabel: {
    ...Typography.bodySmall,
    fontWeight: '600',
    marginBottom: 4,
  },
  scoreButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scoreButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  scoreButtonSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  scoreButtonText: {
    ...Typography.bodySmall,
    fontWeight: '600',
  },
  indexPreview: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginVertical: Spacing.lg,
    alignItems: 'center',
    ...Shadows.small,
  },
  indexTitle: {
    ...Typography.h4,
    marginBottom: Spacing.sm,
  },
  indexValue: {
    ...Typography.h1,
    color: Colors.primary,
    marginBottom: Spacing.md,
  },
  indexBar: {
    width: '100%',
    height: 8,
    backgroundColor: Colors.surface,
    borderRadius: 4,
    overflow: 'hidden',
  },
  indexFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  submitButton: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.xxl,
  },
});