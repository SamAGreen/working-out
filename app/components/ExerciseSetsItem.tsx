import React, { memo, useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useAddSet, useUpdateSet } from "../stores/setStore";
import { theme } from "../styling/stylingStandards";
import { Exercise, ExerciseSet, metricToNiceString } from "../util/dataTypes";
import CustomText from "./CustomText";
import CustomTextInput from "./CustomTextInput";

interface ExerciseSetsItemProps {
  exercise: Exercise;
  sets: ExerciseSet[];
  selected?: boolean;
  onPress: (id: number) => void;
  onLongPress?: (exercise: Exercise) => void;
}

type Change = {
  setId: number;
  metric: number; // 1 or 2
  value: number;
};

type LocalValues = {
  [setId: number]: { metricValueOne?: string; metricValueTwo?: string };
};

const ExerciseSetsItem: React.FC<ExerciseSetsItemProps> = memo(
  ({ exercise, sets, selected, onPress, onLongPress }) => {
    const setSetById = useUpdateSet();
    const addSetToStore = useAddSet();

    const [localSets, setLocalSets] = useState<ExerciseSet[]>(sets);
    const [localValues, setLocalValues] = useState<LocalValues>({});
    const changesRef = useRef<Change[]>([]);

    const handlePress = () => onPress(exercise.id);

    useEffect(() => {
      setLocalSets(sets);
      const initialValues: LocalValues = {};
      sets.forEach((set) => {
        initialValues[set.id] = {
          metricValueOne: set.metricValueOne?.toString() ?? "",
          metricValueTwo: set.metricValueTwo?.toString() ?? "",
        };
      });
      setLocalValues(initialValues);
    }, [sets]);

    const getTrackingMetrics = (exercise: Exercise) =>
      metricToNiceString(exercise.trackingMetric).split("/");

    const handleInputChange = (
      setId: number,
      field: "metricValueOne" | "metricValueTwo",
      value: string
    ) => {
      setLocalValues((prev) => ({
        ...prev,
        [setId]: { ...prev[setId], [field]: value },
      }));

      const metricIndex = field === "metricValueOne" ? 1 : 2;
      const numericValue = Number(value) || 0;

      const index = changesRef.current.findIndex(
        (c) => c.setId === setId && c.metric === metricIndex
      );
      if (index !== -1) {
        changesRef.current[index] = {
          setId,
          metric: metricIndex,
          value: numericValue,
        };
      } else {
        changesRef.current.push({
          setId,
          metric: metricIndex,
          value: numericValue,
        });
      }
    };

    const addNewSet = () => {
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
        setLocalValues((prev) => ({
          ...prev,
          [newId]: { metricValueOne: "", metricValueTwo: "" },
        }));
      }
    };

    // Flush changes to store
    const flushChanges = async () => {
      // Update existing sets
      for (const change of changesRef.current) {
        if (change.setId > 0)
          await setSetById(change.setId, change.metric, change.value);
      }
      changesRef.current = [];
      if (sets[0]) {
        // Add new sets
        for (const set of localSets) {
          if (set.id < 0) {
            const values = localValues[set.id];
            await addSetToStore({
              exerciseId: set.exerciseId,
              metricValueOne: Number(values.metricValueOne) || 0,
              metricValueTwo: Number(values.metricValueTwo) || 0,
              workoutId: sets[0].workoutId ?? -1,
            });
          }
        }
      }
    };

    useEffect(() => {
      return () => {
        flushChanges();
      };
    }, []);

    useEffect(() => {
      if (!selected && changesRef.current.length > 0) {
        flushChanges();
      }
    }, [selected]);

    return (
      <Pressable
        style={({ pressed }) => [
          styles.container,
          pressed && { opacity: 0.7 },
          selected && { backgroundColor: theme.Colors.background_50 },
        ]}
        onPress={handlePress}
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
          {getTrackingMetrics(exercise).map((metric, metricIndex) => (
            <View style={styles.metricColumn} key={metricIndex}>
              <CustomText
                weight={theme.FontWeights.medium}
                color={theme.Colors.text}
              >
                {metric}
              </CustomText>

              {localSets
                .filter((set) => set.exerciseId === exercise.id)
                .map((set) => {
                  const field =
                    metricIndex === 0 ? "metricValueOne" : "metricValueTwo";
                  return (
                    <CustomTextInput
                      key={set.id}
                      value={localValues[set.id]?.[field] ?? ""}
                      onChangeText={(value) =>
                        handleInputChange(set.id, field, value)
                      }
                      keyboardType="numeric"
                      style={styles.input}
                      size={theme.FontSizes.medium}
                      color={theme.Colors.text}
                      weight={theme.FontWeights.medium}
                      onFocus={handlePress}
                    />
                  );
                })}
            </View>
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
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: theme.Radius.sm,
    paddingVertical: theme.Spacing.sm,
  },
  metricColumn: {
    alignItems: "center",
    gap: theme.Spacing.xs,
  },
  input: {
    width: 60,
    textAlign: "center",
    backgroundColor: theme.Colors.background_100,
    borderWidth: 1,
    borderColor: theme.Colors.background_800,
    borderRadius: theme.Radius.sm,
    paddingVertical: theme.Spacing.xs,
    paddingHorizontal: theme.Spacing.xs,
  },
  addButton: {
    marginTop: theme.Spacing.sm,
    padding: theme.Spacing.sm,
    backgroundColor: theme.Colors.background_800,
    borderRadius: theme.Radius.sm,
    alignItems: "center",
  },
});

export default memo(ExerciseSetsItem);
