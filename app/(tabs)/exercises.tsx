import { useFocusEffect } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import { Alert, FlatList, StyleSheet } from 'react-native';
import { AddExerciseItem } from '../components/AddExerciseItem';
import ExerciseListItem from '../components/ExerciseListItem';
import ScreenWrapper from '../components/ScreenWrapper';
import SearchBar from '../components/SearchBar';
import {
  addExercise,
  deleteExercise,
  Exercise,
  ExerciseShell,
  MetricToNiceString,
  TrackingMetric,
} from '../db/database';
import { useAddLocation } from '../hooks/useAddStore';
import { useExercises } from '../hooks/useExercises';
import { theme } from '../styling/stylingStandards';

export default function ExercisesScreen() {
  const { filteredExercises, searchValue, handleSearch, addExerciseToList, removeExerciseFromList } =
    useExercises();

  const plusLocation = useAddLocation((state) => state.plusLocation);
  const resetAddLocation = useAddLocation((state) => state.resetAddLocation);
  const localLocation = 'exercises';

  const [newExerciseName, setNewExerciseName] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<TrackingMetric>(TrackingMetric.REPS_WEIGHT);

  const [items, setItems] = useState(
    Object.values(TrackingMetric).map((key) => ({
      label: MetricToNiceString(key),
      value: key,
    }))
  );

  // Reset "add mode" when leaving the screen
  useFocusEffect(
    useCallback(() => {
      return () => {
        resetAddLocation();
      };
    }, [])
  );

  const handleDelete = (exercise: Exercise) => {
    deleteExercise(exercise.id).then((success) => {
      if (success) {
        removeExerciseFromList(exercise);
        Alert.alert(exercise.name + ' DELETED');
      } else {
        console.log('Something went wrong handling delete');
      }
    });
  };

  const handleAddNewExercise = async () => {
    if (!newExerciseName.trim()) return;

    const shell: ExerciseShell = { name: newExerciseName, trackingMetric: selectedMetric };
    try {
      const newExercise = await addExercise(shell);
      addExerciseToList({
        id: newExercise.id,
        name: newExercise.name,
        trackingMetric: newExercise.trackingMetric,
      });
      setNewExerciseName('');
      setSelectedMetric(TrackingMetric.REPS_WEIGHT);
      resetAddLocation();
    } catch (error) {
      console.error('Error adding exercise:', error);
    }
  };



  const listData = useMemo(() => filteredExercises, [filteredExercises]);

  return (
    <ScreenWrapper style={styles.container}>
      <SearchBar
        value={searchValue}
        onChangeText={handleSearch}
        onClear={() => handleSearch('')}
        placeholder="Search exercises..."
      />

      {plusLocation === localLocation && (
        <AddExerciseItem
          newExerciseName={newExerciseName}
          setNewExerciseName={setNewExerciseName}
          selectedMetric={selectedMetric}
          setSelectedMetric={setSelectedMetric}
          items={items}
          setItems={setItems}
          open={open}
          setOpen={setOpen}
          handleAddNewExercise={handleAddNewExercise}
        />
      )}
      <FlatList
        data={listData}
        renderItem={({ item }) => (
          <ExerciseListItem exercise={item} onDelete={handleDelete} />
        )}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  list: {
    width: '100%',
  },
  newItemContainer: {
    backgroundColor: theme.Colors.primary_100,
    borderRadius: theme.Radius.md,
    padding: theme.Spacing.md,
    marginBottom: theme.Spacing.sm,
    borderWidth: 1,
    borderColor: theme.Colors.accent_100,
    width: '100%',
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: theme.FontSizes.large,
    marginBottom: theme.Spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  dropdownWrapper: {
    flex: 1,
    marginRight: theme.Spacing.sm,
    maxWidth: '70%',
  },
  dropDownPicker: {
    backgroundColor: theme.Colors.background,
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.Colors.primary,
    borderRadius: theme.Radius.md,
    paddingHorizontal: theme.Spacing.lg,
    paddingVertical: theme.Spacing.sm,
    height: 48,
  },
});
