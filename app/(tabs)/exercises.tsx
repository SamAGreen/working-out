import React from 'react';
import { Alert, FlatList, StyleSheet } from 'react-native';
import AddItemModal from '../components/AddItemModal';
import ExerciseListItem from '../components/ExerciseListItem';
import ScreenWrapper from '../components/ScreenWrapper';
import SearchBar from '../components/SearchBar';
import { addExercise, deleteExercise, Exercise, ExerciseShell, TrackingMetric } from '../db/database';
import { useAddLocation } from '../hooks/useAddStore';
import { useExercises } from '../hooks/useExercises';

export default function ExercisesScreen() {
  const { filteredExercises, searchValue, handleSearch, addExerciseToList, removeExerciseFromList } = useExercises();

  const plusLocation = useAddLocation((state) => state.plusLocation);
  const resetAddLocation = useAddLocation((state) => state.resetAddLocation);
  const localLocation = 'exercises';

  const handleDelete = (exercise: Exercise) => {
    deleteExercise(exercise.id).then((success) => {
      if (success) {
        removeExerciseFromList(exercise);
        Alert.alert(exercise.name + ' DELETED');
      } else {
        console.log("Something went wrong handling delete");
      }
    })
  }

  const createExerciseShell = (name: string): ExerciseShell => {
    return {
      name: name, trackingMetric: TrackingMetric.REPS_WEIGHT
    };
  }

  return (
    <ScreenWrapper style={styles.container}>
      <SearchBar
        value={searchValue}
        onChangeText={handleSearch}
        onClear={() => handleSearch('')}
        placeholder="Search exercises..."
      />
      <FlatList
        data={filteredExercises}
        renderItem={({ item }) => <ExerciseListItem exercise={item} onDelete={handleDelete} />}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />
      <AddItemModal visible={plusLocation === localLocation} onClose={resetAddLocation} onAdd={addExercise} onAddToList={addExerciseToList} createShell={createExerciseShell} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%"
  },
  list: {
    width: "100%",
    display: 'flex',
  },
});