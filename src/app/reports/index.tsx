import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Alert,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Colors } from '../../constants/Colors';
import { BorderRadius, Shadows, Spacing, Typography } from '../../constants/Styles';
import { useI18n } from '../../contexts/I18nContext';

interface GarbageType {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

interface GarbageEntry {
  id: string;
  date: string;
  type: string;
  amount: number;
  unit: string;
  location: string;
  reportedBy: string;
}

const mockEntries: GarbageEntry[] = [
  {
    id: '1',
    date: '2024-01-15',
    type: 'recyclable',
    amount: 12.5,
    unit: 'kg',
    location: 'Classroom 7A',
    reportedBy: 'Mrs. Lima'
  },
  {
    id: '2',
    date: '2024-01-14',
    type: 'organic',
    amount: 8.2,
    unit: 'kg',
    location: 'School Cafeteria',
    reportedBy: 'Cafeteria Staff'
  },
  {
    id: '3',
    date: '2024-01-13',
    type: 'paper',
    amount: 6.7,
    unit: 'kg',
    location: 'Library',
    reportedBy: 'Ms. Santos'
  },
];

export default function ReportsScreen() {
  const { t } = useI18n();
  
  const garbageTypes: GarbageType[] = [
    { id: 'recyclable', name: t('garbage.recyclable'), icon: 'reload', color: Colors.success },
    { id: 'organic', name: t('garbage.organic'), icon: 'leaf', color: Colors.earth },
    { id: 'paper', name: t('garbage.paper'), icon: 'document', color: Colors.secondary },
    { id: 'plastic', name: t('garbage.plastic'), icon: 'water', color: Colors.accent },
    { id: 'general', name: t('garbage.general'), icon: 'trash', color: Colors.textSecondary },
    { id: 'hazardous', name: t('garbage.hazardous'), icon: 'warning', color: Colors.error },
  ];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [location, setLocation] = useState('');
  const [reporterName, setReporterName] = useState('');
  const [entries, setEntries] = useState(mockEntries);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getTotalByType = (typeId: string) => {
    return entries
      .filter(entry => entry.type === typeId)
      .reduce((sum, entry) => sum + entry.amount, 0);
  };

  const getGrandTotal = () => {
    return entries.reduce((sum, entry) => sum + entry.amount, 0);
  };

  const handleSubmitReport = async () => {
    if (!selectedType || !amount || !location || !reporterName) {
      Alert.alert(t('reports.incompleteReport'), t('reports.fillAllFields'));
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newEntry: GarbageEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        type: selectedType,
        amount: parseFloat(amount),
        unit: 'kg',
        location,
        reportedBy: reporterName,
      };

      setEntries(prev => [newEntry, ...prev]);
      
      Alert.alert(
        t('reports.reportSubmitted'),
        `${t('reports.successfullyRecorded')} ${amount}kg ${t('common.of')} ${garbageTypes.find(t => t.id === selectedType)?.name}`,
        [{ text: 'OK', onPress: () => setIsModalVisible(false) }]
      );
      
      // Reset form
      setSelectedType(null);
      setAmount('');
      setLocation('');
      setReporterName('');
      setIsSubmitting(false);
    }, 1500);
  };

  const GarbageTypeCard = ({ type }: { type: GarbageType }) => (
    <TouchableOpacity
      style={[
        styles.typeCard,
        selectedType === type.id && { borderColor: type.color, backgroundColor: type.color + '10' }
      ]}
      onPress={() => setSelectedType(type.id)}
    >
      <View style={[styles.typeIcon, { backgroundColor: type.color + '20' }]}>
        <Ionicons name={type.icon} size={24} color={type.color} />
      </View>
      <Text style={[
        styles.typeName,
        selectedType === type.id && { color: type.color }
      ]}>
        {type.name}
      </Text>
      <Text style={styles.typeTotal}>
        {getTotalByType(type.id).toFixed(1)} kg
      </Text>
    </TouchableOpacity>
  );

  const EntryItem = ({ entry }: { entry: GarbageEntry }) => {
    const type = garbageTypes.find(t => t.id === entry.type);
    
    return (
      <View style={styles.entryItem}>
        <View style={[styles.entryIcon, { backgroundColor: type?.color + '20' }]}>
          <Ionicons name={type?.icon || 'trash'} size={20} color={type?.color} />
        </View>
        
        <View style={styles.entryInfo}>
          <Text style={styles.entryType}>{type?.name}</Text>
          <Text style={styles.entryDetails}>
            {entry.location} • {new Date(entry.date).toLocaleDateString()}
          </Text>
          <Text style={styles.entryReporter}>{t('reports.reportedBy')} {entry.reportedBy}</Text>
        </View>
        
        <View style={styles.entryAmount}>
          <Text style={styles.entryAmountText}>{entry.amount} {entry.unit}</Text>
        </View>
      </View>
    );
  };

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
          <Text style={styles.headerTitle}>{t('reports.title')}</Text>
          <TouchableOpacity 
            onPress={() => setIsModalVisible(true)} 
            style={styles.addButton}
          >
            <Ionicons name="add" size={24} color={Colors.textLight} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Summary Stats */}
        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>{t('reports.weeklySummary')}</Text>
          <View style={styles.summaryCard}>
            <View style={styles.totalSection}>
              <Text style={styles.totalLabel}>{t('reports.totalCollected')}</Text>
              <Text style={styles.totalValue}>{getGrandTotal().toFixed(1)} kg</Text>
            </View>
            <View style={styles.summaryGrid}>
              {garbageTypes.slice(0, 4).map(type => (
                <View key={type.id} style={styles.summaryItem}>
                  <View style={[styles.summaryIcon, { backgroundColor: type.color + '20' }]}>
                    <Ionicons name={type.icon} size={16} color={type.color} />
                  </View>
                  <Text style={styles.summaryAmount}>{getTotalByType(type.id).toFixed(1)}</Text>
                  <Text style={styles.summaryUnit}>kg</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Type Overview */}
        <View style={styles.typesSection}>
          <Text style={styles.sectionTitle}>{t('reports.byCategory')}</Text>
          <View style={styles.typesGrid}>
            {garbageTypes.map(type => (
              <GarbageTypeCard key={type.id} type={type} />
            ))}
          </View>
        </View>

        {/* Recent Entries */}
        <View style={styles.entriesSection}>
          <Text style={styles.sectionTitle}>{t('reports.recentReports')}</Text>
          {entries.map(entry => (
            <EntryItem key={entry.id} entry={entry} />
          ))}
        </View>
      </ScrollView>

      {/* Add Report Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer} edges={['top', 'left', 'right']}>
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              onPress={() => setIsModalVisible(false)}
              style={styles.modalBackButton}
            >
              <Ionicons name="close" size={24} color={Colors.text} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{t('reports.newReport')}</Text>
            <View style={styles.modalHeaderRight} />
          </View>

          <ScrollView style={styles.modalContent}>
            <Text style={styles.formLabel}>{t('reports.selectType')}</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.typeSelector}
            >
              {garbageTypes.map(type => (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.typeSelectorItem,
                    selectedType === type.id && { 
                      borderColor: type.color,
                      backgroundColor: type.color + '10'
                    }
                  ]}
                  onPress={() => setSelectedType(type.id)}
                >
                  <View style={[styles.typeSelectorIcon, { backgroundColor: type.color + '20' }]}>
                    <Ionicons name={type.icon} size={20} color={type.color} />
                  </View>
                  <Text style={[
                    styles.typeSelectorText,
                    selectedType === type.id && { color: type.color }
                  ]}>
                    {type.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Input
              label={t('reports.amount')}
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder={t('reports.placeholders.amount')}
              style={styles.formInput}
            />

            <Input
              label={t('reports.location')}
              value={location}
              onChangeText={setLocation}
              placeholder={t('reports.placeholders.location')}
              style={styles.formInput}
            />

            <Input
              label={t('reports.reporter')}
              value={reporterName}
              onChangeText={setReporterName}
              placeholder={t('reports.placeholders.reporter')}
              style={styles.formInput}
            />

            <Button
              title={t('reports.submit')}
              onPress={handleSubmitReport}
              variant="gradient"
              size="large"
              loading={isSubmitting}
              disabled={!selectedType || !amount || !location || !reporterName}
              style={styles.submitButton}
            />
          </ScrollView>
        </SafeAreaView>
      </Modal>
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
  addButton: {
    padding: Spacing.sm,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  summarySection: {
    marginTop: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.h4,
    marginBottom: Spacing.lg,
  },
  summaryCard: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.medium,
  },
  totalSection: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  totalLabel: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  totalValue: {
    ...Typography.h1,
    color: Colors.primary,
    fontWeight: '700',
    marginTop: Spacing.xs,
  },
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  summaryAmount: {
    ...Typography.body,
    fontWeight: '600',
  },
  summaryUnit: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  typesSection: {
    marginTop: Spacing.xl,
  },
  typesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -Spacing.xs,
  },
  typeCard: {
    width: '50%',
    paddingHorizontal: Spacing.xs,
    marginBottom: Spacing.md,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    ...Shadows.small,
  },
  typeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  typeName: {
    ...Typography.bodySmall,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  typeTotal: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '600',
  },
  entriesSection: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.xxl,
  },
  entryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadows.small,
  },
  entryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  entryInfo: {
    flex: 1,
  },
  entryType: {
    ...Typography.body,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  entryDetails: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  entryReporter: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  entryAmount: {
    alignItems: 'flex-end',
  },
  entryAmountText: {
    ...Typography.body,
    color: Colors.primary,
    fontWeight: '600',
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalBackButton: {
    padding: Spacing.sm,
  },
  modalTitle: {
    ...Typography.h4,
    flex: 1,
    textAlign: 'center',
  },
  modalHeaderRight: {
    width: 40,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },
  formLabel: {
    ...Typography.body,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },
  typeSelector: {
    marginBottom: Spacing.lg,
  },
  typeSelectorItem: {
    alignItems: 'center',
    marginRight: Spacing.md,
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    borderColor: 'transparent',
    minWidth: 100,
  },
  typeSelectorIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  typeSelectorText: {
    ...Typography.caption,
    textAlign: 'center',
  },
  formInput: {
    marginBottom: Spacing.md,
  },
  submitButton: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.xxl,
  },
});