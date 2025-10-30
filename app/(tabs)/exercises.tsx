import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { AddExerciseItem } from "../components/AddExerciseItem";
import ExerciseListItem from "../components/ExerciseListItem";
import ScreenWrapper from "../components/ScreenWrapper";
import SearchBar from "../components/SearchBar";
import { useAddLocation } from "../stores/addLocationStore";
import {
  useAddExercise,
  useDeleteExercise,
  useExercises,
  useGetAllExercises,
} from "../stores/exerciseStore";
import { theme } from "../styling/stylingStandards";
import {
  Exercise,
  ExerciseShell,
  MetricToNiceString,
  TrackingMetric,
} from "../util/dataTypes";

export default function ExercisesScreen() {
  const plusLocation = useAddLocation((state) => state.plusLocation);
  const resetAddLocation = useAddLocation((state) => state.resetAddLocation);
  const localLocation = "exercises";

  const [newExerciseName, setNewExerciseName] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<TrackingMetric>(
    TrackingMetric.WEIGHT_REPS
  );

  const [searchValue, setSearchValue] = useState("");

  const getAllExercises = useGetAllExercises();

  const addExercise = useAddExercise();

  const deleteExercise = useDeleteExercise();

  const allExercises = useExercises();
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    (async () => {
      await getAllExercises();
    })();
  }, [getAllExercises]);

  useEffect(() => {
    const filtered = allExercises.filter((exercise) =>
      exercise.name.toUpperCase().includes(searchValue.toUpperCase())
    );
    setFilteredExercises(filtered);
  }, [searchValue, allExercises]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        resetAddLocation();
      };
    }, [resetAddLocation])
  );

  const [items, setItems] = useState(
    Object.values(TrackingMetric).map((key) => ({
      label: MetricToNiceString(key),
      value: key,
    }))
  );

  const handleDelete = async (exercise: Exercise) => {
    const result = await deleteExercise(exercise.id);
    if (!result.success) {
      console.log("Something went wrong handling delete: ", result.error);
    }
  };

  const handleAddNewExercise = async () => {
    if (!newExerciseName.trim()) return;

    const shell: ExerciseShell = {
      name: newExerciseName,
      trackingMetric: selectedMetric,
    };

    const result = await addExercise(shell);
    if (!result.success) {
      console.log("Something went wrong adding: ", result.error);
      return;
    }

    setNewExerciseName("");
    setSelectedMetric(TrackingMetric.WEIGHT_REPS);
    resetAddLocation();
  };

  return (
    <ScreenWrapper style={styles.container}>
      <SearchBar
        value={searchValue}
        onChangeText={(text) => setSearchValue(text)}
        onClear={() => setSearchValue("")}
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
        data={filteredExercises}
        renderItem={({ item }) => (
          <ExerciseListItem exercise={item} onDelete={handleDelete} />
        )}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View style={{ height: theme.Spacing.xs }} />
        )}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  list: {
    width: "100%",
  },
  newItemContainer: {
    backgroundColor: theme.Colors.primary_100,
    borderRadius: theme.Radius.md,
    padding: theme.Spacing.md,
    marginBottom: theme.Spacing.sm,
    borderWidth: 1,
    borderColor: theme.Colors.accent_100,
    width: "100%",
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: theme.FontSizes.large,
    marginBottom: theme.Spacing.sm,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  dropdownWrapper: {
    flex: 1,
    marginRight: theme.Spacing.sm,
    maxWidth: "70%",
  },
  dropDownPicker: {
    backgroundColor: theme.Colors.background,
  },
  addButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.Colors.primary,
    borderRadius: theme.Radius.md,
    paddingHorizontal: theme.Spacing.lg,
    paddingVertical: theme.Spacing.sm,
    height: 48,
  },
});
