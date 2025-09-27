import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '../../constants/Colors';
import { BorderRadius, Shadows, Spacing, Typography } from '../../constants/Styles';
import { useI18n } from '../../contexts/I18nContext';

interface ClassRanking {
  id: string;
  name: string;
  grade: string;
  teacher: string;
  garbageIndex: number;
  lastEvaluation: string;
  trend: 'up' | 'down' | 'stable';
  scores: {
    classroom_clean: number;
    school_areas: number;
    garbage_sorting: number;
    sustainability: number;
  };
}

const classRankings: ClassRanking[] = [
  {
    id: '1',
    name: 'Class 7A',
    grade: '7th Grade',
    teacher: 'Mrs. Lima',
    garbageIndex: 92,
    lastEvaluation: '2024-01-15',
    trend: 'up',
    scores: { classroom_clean: 5, school_areas: 4, garbage_sorting: 5, sustainability: 5 }
  },
  {
    id: '2',
    name: 'Class 6B',
    grade: '6th Grade',
    teacher: 'Mr. Costa',
    garbageIndex: 88,
    lastEvaluation: '2024-01-14',
    trend: 'stable',
    scores: { classroom_clean: 4, school_areas: 5, garbage_sorting: 4, sustainability: 5 }
  },
  {
    id: '3',
    name: 'Class 5A',
    grade: '5th Grade',
    teacher: 'Mrs. Silva',
    garbageIndex: 85,
    lastEvaluation: '2024-01-13',
    trend: 'up',
    scores: { classroom_clean: 4, school_areas: 4, garbage_sorting: 4, sustainability: 4 }
  },
  {
    id: '4',
    name: 'Class 6A',
    grade: '6th Grade',
    teacher: 'Ms. Oliveira',
    garbageIndex: 82,
    lastEvaluation: '2024-01-12',
    trend: 'down',
    scores: { classroom_clean: 4, school_areas: 3, garbage_sorting: 5, sustainability: 4 }
  },
  {
    id: '5',
    name: 'Class 7B',
    grade: '7th Grade',
    teacher: 'Mr. Pereira',
    garbageIndex: 78,
    lastEvaluation: '2024-01-11',
    trend: 'stable',
    scores: { classroom_clean: 3, school_areas: 4, garbage_sorting: 4, sustainability: 4 }
  },
  {
    id: '6',
    name: 'Class 5B',
    grade: '5th Grade',
    teacher: 'Mr. Santos',
    garbageIndex: 74,
    lastEvaluation: '2024-01-10',
    trend: 'up',
    scores: { classroom_clean: 3, school_areas: 3, garbage_sorting: 4, sustainability: 4 }
  },
];

export default function RankingsScreen() {
  const { t } = useI18n();

  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  const getRankingColor = (position: number) => {
    switch (position) {
      case 1: return Colors.success;
      case 2: return '#FFA500';
      case 3: return '#CD7F32';
      default: return Colors.primary;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return 'trending-up';
      case 'down': return 'trending-down';
      default: return 'remove';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return Colors.success;
      case 'down': return Colors.error;
      default: return Colors.textSecondary;
    }
  };

  const RankingCard = ({ ranking, position }: { ranking: ClassRanking; position: number }) => (
    <TouchableOpacity
      style={[
        styles.rankingCard,
        selectedClass === ranking.id && styles.rankingCardSelected,
        position <= 3 && styles.topRankingCard
      ]}
      onPress={() => setSelectedClass(selectedClass === ranking.id ? null : ranking.id)}
    >
      <View style={styles.rankingHeader}>
        <View style={[styles.positionBadge, { backgroundColor: getRankingColor(position) }]}>
          {position <= 3 ? (
            <Ionicons 
              name={position === 1 ? 'trophy' : 'medal'} 
              size={24} 
              color={Colors.textLight} 
            />
          ) : (
            <Text style={styles.positionText}>#{position}</Text>
          )}
        </View>
        
        <View style={styles.classInfo}>
          <Text style={styles.className}>{ranking.name}</Text>
          <Text style={styles.classDetails}>{ranking.grade} • {ranking.teacher}</Text>
        </View>
        
        <View style={styles.scoreSection}>
          <Text style={styles.garbageIndex}>{ranking.garbageIndex}/100</Text>
          <View style={styles.trendContainer}>
            <Ionicons
              name={getTrendIcon(ranking.trend) as any}
              size={16}
              color={getTrendColor(ranking.trend)}
            />
          </View>
        </View>
      </View>

      {/* Expanded Details */}
      {selectedClass === ranking.id && (
        <View style={styles.expandedContent}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill,
                { 
                  width: `${ranking.garbageIndex}%`,
                  backgroundColor: getRankingColor(position)
                }
              ]} 
            />
          </View>
          
          <View style={styles.scoresGrid}>
            <View style={styles.scoreItem}>
              <Ionicons name="home" size={20} color={Colors.primary} />
              <Text style={styles.scoreLabel}>{t('rankings.details.classroom')}</Text>
              <Text style={styles.scoreValue}>{ranking.scores.classroom_clean}/5</Text>
            </View>
            <View style={styles.scoreItem}>
              <Ionicons name="business" size={20} color={Colors.primary} />
              <Text style={styles.scoreLabel}>{t('rankings.details.commonAreas')}</Text>
              <Text style={styles.scoreValue}>{ranking.scores.school_areas}/5</Text>
            </View>
            <View style={styles.scoreItem}>
              <Ionicons name="layers" size={20} color={Colors.primary} />
              <Text style={styles.scoreLabel}>{t('rankings.details.sorting')}</Text>
              <Text style={styles.scoreValue}>{ranking.scores.garbage_sorting}/5</Text>
            </View>
            <View style={styles.scoreItem}>
              <Ionicons name="leaf" size={20} color={Colors.primary} />
              <Text style={styles.scoreLabel}>{t('rankings.details.sustainability')}</Text>
              <Text style={styles.scoreValue}>{ranking.scores.sustainability}/5</Text>
            </View>
          </View>
          
          <Text style={styles.lastEvaluation}>
            {t('rankings.lastEvaluated')} {new Date(ranking.lastEvaluation).toLocaleDateString()}
          </Text>
        </View>
      )}
    </TouchableOpacity>
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
          <Text style={styles.headerTitle}>{t('rankings.title')}</Text>
          <TouchableOpacity 
            onPress={() => router.push('/evaluation' as any)} 
            style={styles.evaluateButton}
          >
            <Ionicons name="add-circle" size={24} color={Colors.textLight} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Overview */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>{t('rankings.overview')}</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>81.5</Text>
              <Text style={styles.statLabel}>{t('rankings.avgIndex')}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>6</Text>
              <Text style={styles.statLabel}>{t('rankings.classes')}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>4</Text>
              <Text style={styles.statLabel}>{t('rankings.improving')}</Text>
            </View>
          </View>
        </View>

        {/* Rankings List */}
        <View style={styles.rankingsSection}>
          <Text style={styles.sectionTitle}>{t('rankings.byGarbageIndex')}</Text>
          {classRankings.map((ranking, index) => (
            <RankingCard
              key={ranking.id}
              ranking={ranking}
              position={index + 1}
            />
          ))}
        </View>

        {/* Achievement Tips */}
        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>{t('rankings.tips.title')}</Text>
          <View style={styles.tipCard}>
            <Ionicons name="bulb" size={24} color={Colors.warning} />
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>{t('rankings.tips.consistency')}</Text>
              <Text style={styles.tipText}>
                {t('rankings.tips.consistencyDesc')}
              </Text>
            </View>
          </View>
          <View style={styles.tipCard}>
            <Ionicons name="people" size={24} color={Colors.accent} />
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>{t('rankings.tips.teamwork')}</Text>
              <Text style={styles.tipText}>
                {t('rankings.tips.teamworkDesc')}
              </Text>
            </View>
          </View>
          <View style={styles.tipCard}>
            <Ionicons name="leaf" size={24} color={Colors.success} />
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>{t('rankings.tips.sustainability')}</Text>
              <Text style={styles.tipText}>
                {t('rankings.tips.sustainabilityDesc')}
              </Text>
            </View>
          </View>
        </View>
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
  evaluateButton: {
    padding: Spacing.sm,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  statsSection: {
    marginTop: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.h4,
    marginBottom: Spacing.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    marginHorizontal: -Spacing.xs,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginHorizontal: Spacing.xs,
    alignItems: 'center',
    ...Shadows.small,
  },
  statValue: {
    ...Typography.h2,
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  rankingsSection: {
    marginTop: Spacing.xl,
  },
  rankingCard: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadows.small,
  },
  rankingCardSelected: {
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  topRankingCard: {
    borderWidth: 1,
    borderColor: Colors.warning + '30',
  },
  rankingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  positionBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  positionText: {
    ...Typography.body,
    color: Colors.textLight,
    fontWeight: '700',
  },
  classInfo: {
    flex: 1,
  },
  className: {
    ...Typography.body,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  classDetails: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
  },
  scoreSection: {
    alignItems: 'flex-end',
  },
  garbageIndex: {
    ...Typography.h3,
    color: Colors.primary,
    fontWeight: '700',
  },
  trendContainer: {
    marginTop: Spacing.xs,
  },
  expandedContent: {
    marginTop: Spacing.lg,
    paddingTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.surface,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  scoresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -Spacing.xs,
    marginBottom: Spacing.md,
  },
  scoreItem: {
    width: '50%',
    paddingHorizontal: Spacing.xs,
    marginBottom: Spacing.sm,
    alignItems: 'center',
  },
  scoreLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
    textAlign: 'center',
  },
  scoreValue: {
    ...Typography.body,
    fontWeight: '600',
    marginTop: Spacing.xs,
  },
  lastEvaluation: {
    ...Typography.caption,
    color: Colors.textMuted,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  tipsSection: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.xxl,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadows.small,
  },
  tipContent: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  tipTitle: {
    ...Typography.body,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  tipText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});