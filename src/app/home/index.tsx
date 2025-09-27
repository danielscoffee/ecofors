import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useI18n } from '../../contexts/I18nContext';

import { Colors } from '../../constants/Colors';
import { BorderRadius, Shadows, Spacing, Typography } from '../../constants/Styles';

interface EcoMetric {
  id: string;
  title: string;
  value: string;
  unit: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
}

interface QuickAction {
  id: string;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  route: string;
}

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const { t, changeLanguage, locale } = useI18n();
  const [userName] = useState('Green Valley School'); // This would come from user context

  const ecoMetrics: EcoMetric[] = [
    {
      id: '1',
      title: t('metrics.totalGarbageCollected'),
      value: '12',
      unit: 'kg',
      trend: 'up',
      trendValue: '+2kg',
      icon: 'trash',
      color: Colors.earth,
    },
    {
      id: '2',
      title: t('metrics.recycledMaterials'),
      value: '78',
      unit: '%',
      trend: 'up',
      trendValue: '+12%',
      icon: 'refresh',
      color: Colors.secondary,
    },
    {
      id: '3',
      title: t('metrics.organicWaste'),
      value: '8',
      unit: 'kg',
      trend: 'up',
      trendValue: '+1kg',
      icon: 'leaf',
      color: Colors.accent,
    },
  ];

  const quickActions: QuickAction[] = [
    {
      id: '1',
      title: t('actions.classEvaluation'),
      subtitle: t('actions.classEvaluation.subtitle'),
      icon: 'school',
      color: Colors.primary,
      route: '/evaluation',
    },
    {
      id: '2',
      title: t('actions.garbageReport'),
      subtitle: t('actions.garbageReport.subtitle'),
      icon: 'trash',
      color: Colors.earth,
      route: '/garbage-report',
    },
    {
      id: '3',
      title: t('actions.classRankings'),
      subtitle: t('actions.classRankings.subtitle'),
      icon: 'trophy',
      color: Colors.accent,
      route: '/rankings',
    },
    {
      id: '4',
      title: t('actions.recyclingGuide'),
      subtitle: t('actions.recyclingGuide.subtitle'),
      icon: 'leaf',
      color: Colors.primary,
      route: '/recycling-guide',
    },
  ];

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleQuickAction = (route: string) => {
    switch (route) {
      case '/evaluation':
        router.push('/evaluation' as any);
        break;
      case '/garbage-report':
        router.push('/reports' as any);
        break;
      case '/rankings':
        router.push('/rankings' as any);
        break;
      case '/recycling-guide':
        // Show recycling guide with proper translations
        Alert.alert(
          t('recyclingGuide.title'),
          `${t('recyclingGuide.quickTips')}\n\n${t('recyclingGuide.tip1')}\n${t('recyclingGuide.tip2')}\n${t('recyclingGuide.tip3')}\n${t('recyclingGuide.tip4')}\n\n${t('recyclingGuide.moreInfo')}`,
          [{ text: t('common.ok') }]
        );
        break;
      default:
        console.log(`Navigate to: ${route}`);
    }
  };

  const handleProfile = () => {
    console.log('Open profile');
  };

  const handleNotifications = () => {
    console.log('Open notifications');
  };

  const toggleLanguage = async () => {
    await changeLanguage(locale === 'en' ? 'pt' : 'en');
  };

  const MetricCard = ({ metric }: { metric: EcoMetric }) => (
    <View style={[styles.metricCard, { borderLeftColor: metric.color }]}>
      <View style={styles.metricHeader}>
        <View style={[styles.metricIcon, { backgroundColor: metric.color + '20' }]}>
          <Ionicons name={metric.icon} size={24} color={metric.color} />
        </View>
        <View style={[styles.trendBadge, metric.trend === 'up' && styles.trendUp]}>
          <Ionicons 
            name={metric.trend === 'up' ? 'trending-up' : 'trending-down'} 
            size={12} 
            color={metric.trend === 'up' ? Colors.success : Colors.error} 
          />
          <Text style={[styles.trendText, { color: metric.trend === 'up' ? Colors.success : Colors.error }]}>
            {metric.trendValue}
          </Text>
        </View>
      </View>
      <Text style={styles.metricValue}>
        {metric.value}
        <Text style={styles.metricUnit}> {metric.unit}</Text>
      </Text>
      <Text style={styles.metricTitle}>{metric.title}</Text>
    </View>
  );

  const QuickActionCard = ({ action }: { action: QuickAction }) => (
    <TouchableOpacity
      style={styles.actionCard}
      onPress={() => handleQuickAction(action.route)}
      activeOpacity={0.7}
    >
      <View style={[styles.actionIcon, { backgroundColor: action.color + '15' }]}>
        <Ionicons name={action.icon} size={24} color={action.color} />
      </View>
      <Text style={styles.actionTitle}>{action.title}</Text>
      <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar style="light" />
      
      {/* Header with gradient */}
      <LinearGradient
        colors={Colors.gradients.primary as any}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <View>
              <Text style={styles.greeting}>{t('home.header.greeting')}</Text>
              <Text style={styles.schoolName}>{userName}</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={toggleLanguage} style={styles.headerButton}>
              <Text style={styles.languageText}>{locale.toUpperCase()}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNotifications} style={styles.headerButton}>
              <Ionicons name="notifications" size={24} color={Colors.textLight} />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleProfile} style={styles.headerButton}>
              <Ionicons name="person-circle" size={24} color={Colors.textLight} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Impact Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('home.metrics.title')}</Text>
          <Text style={styles.sectionSubtitle}>
            {t('home.header.subtitle')}
          </Text>
          
          <View style={styles.metricsGrid}>
            {ecoMetrics.map((metric, index) => (
              <View key={metric.id} style={styles.metricContainer}>
                <MetricCard metric={metric} />
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('home.quickActions.title')}</Text>
          <Text style={styles.sectionSubtitle}>
            {t('home.header.subtitle')}
          </Text>
          
          <View style={styles.actionsGrid}>
            {quickActions.map((action) => (
              <QuickActionCard key={action.id} action={action} />
            ))}
          </View>
        </View>

        {/* Today's Highlight */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('home.highlights.title')}</Text>
          <View style={styles.highlightCard}>
            <LinearGradient
              colors={Colors.gradients.nature as any}
              style={styles.highlightGradient}
            >
              <View style={styles.highlightContent}>
                <View style={styles.highlightIcon}>
                  <Ionicons name="trophy" size={32} color={Colors.textLight} />
                </View>
                <View style={styles.highlightText}>
                  <Text style={styles.highlightTitle}>
                    {t('home.highlights.subtitle')}
                  </Text>
                  <Text style={styles.highlightSubtitle}>
                    {t('metrics.thisWeek')}
                  </Text>
                </View>
              </View>
            </LinearGradient>
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
  },
  greeting: {
    ...Typography.body,
    color: Colors.textLight,
    opacity: 0.9,
  },
  schoolName: {
    ...Typography.h3,
    color: Colors.textLight,
    marginTop: 2,
  },
  headerButton: {
    padding: Spacing.sm,
    marginLeft: Spacing.sm,
    position: 'relative',
  },
  languageText: {
    ...Typography.caption,
    color: Colors.textLight,
    fontWeight: '600',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accent,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    ...Typography.h3,
    marginBottom: 4,
  },
  sectionSubtitle: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  metricContainer: {
    width: '50%',
    paddingHorizontal: 6,
    marginBottom: 10,
  },
  metricCard: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 3,
    ...Shadows.small,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  metricIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
  },
  trendUp: {
    backgroundColor: Colors.success + '20',
  },
  trendText: {
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 2,
  },
  metricValue: {
    ...Typography.h3,
    marginBottom: Spacing.xs,
  },
  metricUnit: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    fontWeight: 'normal',
  },
  metricTitle: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  actionCard: {
    width: '50%',
    paddingHorizontal: 6,
    marginBottom: 12,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    padding: 16,
    alignItems: 'center',
    minHeight: 100,
    justifyContent: 'center',
    ...Shadows.small,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionTitle: {
    ...Typography.bodySmall,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  actionSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 14,
  },
  highlightCard: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.medium,
  },
  highlightGradient: {
    padding: Spacing.lg,
  },
  highlightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  highlightIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  highlightText: {
    flex: 1,
  },
  highlightTitle: {
    ...Typography.h4,
    color: Colors.textLight,
    marginBottom: Spacing.xs,
  },
  highlightSubtitle: {
    ...Typography.body,
    color: Colors.textLight,
    opacity: 0.9,
  },
});