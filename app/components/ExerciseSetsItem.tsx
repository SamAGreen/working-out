import React, { memo, useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useAddSet, useUpdateSet } from "../stores/setStore";
import { theme } from "../styling/stylingStandards";
import { Exercise, ExerciseSet, metricToNiceString, metricToUnits } from "../util/dataTypes";
import CustomText from "./CustomText";
import ExerciseSetRow from "./ExerciseSetRow";

interface ExerciseSetsItemProps {
  exercise: Exercise;
  sets: ExerciseSet[];
  selected?: boolean;
  onPress: (id: number) => void;
  onLongPress?: (exercise: Exercise) => void;
}

const ExerciseSetsItem: React.FC<ExerciseSetsItemProps> = memo(
  ({ exercise, sets, selected, onPress, onLongPress }) => {
    const setSetById = useUpdateSet();
    const addSetToStore = useAddSet();

    const [localSets, setLocalSets] = useState<ExerciseSet[]>(sets);

    const metricLabels = metricToNiceString(exercise.trackingMetric).split("/");
    const metricUnits = metricToUnits(exercise.trackingMetric);

    const handleFocusExercise = useCallback(
      () => onPress(exercise.id),
      [onPress, exercise.id]
    );

    const handleCommitChange = useCallback(
      async (id: number, metric: 1 | 2, value: number) => {
        if (id > 0) {
          await setSetById(id, metric, value);
        } else {
          // Update negative id sets in local state
          setLocalSets((prev) =>
            prev.map((s) =>
              s.id === id
                ? {
                    ...s,
                    metricValueOne: metric === 1 ? value : s.metricValueOne,
                    metricValueTwo: metric === 2 ? value : s.metricValueTwo,
                  }
                : s
            )
          );
        }
      },
      [setSetById]
    );

    const addNewSet = useCallback(() => {
      const newId = Math.min(...localSets.map((s) => s.id), 0) - 1;
      if (sets[0]) {
        const newSet: ExerciseSet = {
          id: newId,
          workoutId: sets[0].workoutId,
          exerciseId: exercise.id,
          metricValueOne: 5,
          metricValueTwo: null,
        };
        setLocalSets((prev) => [...prev, newSet]);
      }
    }, [exercise.id, localSets, sets]);

    // Sync with store when sets prop changes
    useEffect(() => {
      setLocalSets(sets);
    }, [sets]);

    return (
      <Pressable
        style={({ pressed }) => [
          styles.container,
          pressed && { opacity: 0.7 },
          selected && { backgroundColor: theme.Colors.background_50 },
        ]}
        onPress={handleFocusExercise}
        onLongPress={() => onLongPress?.(exercise)}
      >
        <CustomText
          size={theme.FontSizes.xxl}
          weight={theme.FontWeights.bold}
          color={theme.Colors.text}
        >
          {exercise.name}
        </CustomText>

        <View style={styles.metricContainer}>
          <View style={styles.metricHeader}>
            {metricLabels.map((label, index) => (
              <CustomText size={theme.FontSizes.large} key={index}>
                {label}
              </CustomText>
            ))}
          </View>

          {localSets.map((set) => (
            <ExerciseSetRow
              key={set.id}
              set={set}
              metricLabels={metricLabels}
              metricUnits={metricUnits}
              onChange={handleCommitChange}
              onFocusExercise={handleFocusExercise}
            />
          ))}
        </View>

        <Pressable style={styles.addButton} onPress={addNewSet}>
          <CustomText
            weight={theme.FontWeights.bold}
            color={theme.Colors.primary}
          >
            + Add Set
          </CustomText>
        </Pressable>
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.Colors.background_100,
    padding: theme.Spacing.md,
    borderRadius: theme.Radius.md,
    marginBottom: theme.Spacing.sm,
    width: "100%",
    borderWidth: 1,
    borderColor: theme.Colors.background_800,
  },
  metricContainer: {
    marginTop: theme.Spacing.sm,
    borderRadius: theme.Radius.sm,
    paddingVertical: theme.Spacing.sm,
  },
  addButton: {
    marginTop: theme.Spacing.sm,
    padding: theme.Spacing.sm,
    backgroundColor: theme.Colors.background_800,
    borderRadius: theme.Radius.sm,
    alignItems: "center",
  },
  metricHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default memo(ExerciseSetsItem);
