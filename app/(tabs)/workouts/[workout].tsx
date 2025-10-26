import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useLocalSearchParams } from 'expo-router';
import AnimatedScreenWrapper from '@/app/components/AnimatedScreenWrapper';
import { theme } from '@/app/styling/stylingStandards';

export default function Workout() {
  const { workout } = useLocalSearchParams();
  const [active, setActive] = useState(false);

  const dummyData = Array.from({ length: 7 }, (_, i) => ({
    title: `Set ${i + 1}`,
    id: i,
  }));

  return (
    <AnimatedScreenWrapper style={styles.container} active={active}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Workout ID: {workout}</Text>
        
      </View>

      <FlatList
        data={dummyData}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        style={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: theme.Spacing.xs }} />}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>{item.title}</Text>
          </View>
        )}
      />
      <Pressable
          style={[styles.toggleButton, active && styles.toggleButtonActive]}
          onPress={() => setActive(!active)}
        >
          <Text style={styles.toggleText}>{active ? 'Finish Workout' : 'Edit Workout'}</Text>
        </Pressable>
    </AnimatedScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: theme.Spacing.md,
  },
  headerText: {
    fontSize: theme.FontSizes.xl,
    fontWeight: 'bold',
    color: theme.Colors.text,
    marginBottom: theme.Spacing.sm,
  },
  toggleButton: {
    backgroundColor: theme.Colors.background,
    paddingHorizontal: theme.Spacing.lg,
    paddingVertical: theme.Spacing.sm,
    borderRadius: theme.Radius.md,
  },
  toggleButtonActive: {
    backgroundColor: theme.Colors.primary_100,
  },
  toggleText: {
    color: theme.Colors.text,
    fontWeight: '600',
  },
  list: {
    width: '100%',
  },
  listItem: {
    backgroundColor: theme.Colors.primary_50,
    borderRadius: theme.Radius.md,
    padding: theme.Spacing.md,
    marginHorizontal: theme.Spacing.sm,
  },
  listItemText: {
    fontSize: theme.FontSizes.medium,
    color: theme.Colors.text,
  },
});
