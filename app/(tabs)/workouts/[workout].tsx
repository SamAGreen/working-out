import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import AnimatedScreenWrapper from "@/app/components/AnimatedScreenWrapper";
import CustomText from "@/app/components/CustomText";
import ExerciseSetsItem from "@/app/components/ExerciseSetsItem";
import ScreenWrapper from "@/app/components/ScreenWrapper";
import { useGetExercises } from "@/app/stores/exerciseStore";
import { useGetSets, useSets } from "@/app/stores/setStore";
import {
  useGetWorkout,
  useSetWorkoutFinished,
} from "@/app/stores/workoutStore";
import { theme } from "@/app/styling/stylingStandards";
import { Exercise, Workout } from "@/app/util/dataTypes";
import { formatDateFromISO } from "@/app/util/util";

export default function WorkoutPage() {
  const { workout } = useLocalSearchParams<{ workout: string }>();
  const [loading, setLoading] = useState(true);
  const [workoutData, setWorkoutData] = useState<Workout>({
    name: "",
    id: -1,
    date: "",
    duration: null,
    finished: false

  });

  const setWorkoutFinished = useSetWorkoutFinished();
  const getWorkout = useGetWorkout();

  const sets = useSets();
  const getSetsByWorkoutId = useGetSets();
  const getExercisesById = useGetExercises();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedExerciseId, setSelectedExerciseId] = useState(-1);

  const onPress = (id: number) => {
    setSelectedExerciseId(id);
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!workout) return;
      setLoading(true);
      try {
        const result = await getWorkout(+workout);

        if (result.success) {
          setWorkoutData(result.data);
          await getSetsByWorkoutId(result.data.id);
        }
      } catch (error) {
        console.error("Error loading workout page:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [workout, getWorkout]);

  useEffect(() => {
    const fetchExercises = async () => {
      if (sets.length === 0) return;

      const allIds = sets.map((set) => set.exerciseId);
      const uniqueIds = [...new Set(allIds)];

      const result = await getExercisesById(uniqueIds);
      if (result.success) setExercises(result.data);
    };

    fetchExercises();
  }, [sets]);

  const handleFinishWorkout = async () => {
    if (!workoutData) return;

    const newFinished = !workoutData.finished;
    setWorkoutData({ ...workoutData, finished: newFinished });

    const result = await setWorkoutFinished(workoutData.id, newFinished);
    if (!result.success) {
      setWorkoutData({ ...workoutData, finished: !newFinished });
      console.log("Failed to update workout status");
    }
  };

  if (loading) {
    return (
      <ScreenWrapper style={styles.container}>
        <Text style={styles.headerText}>Loading workout...</Text>
      </ScreenWrapper>
    );
  }

  if (!workoutData) {
    return (
      <ScreenWrapper style={styles.container}>
        <Text style={styles.headerText}>Workout not found.</Text>
      </ScreenWrapper>
    );
  }

  return (
    <AnimatedScreenWrapper
      style={styles.container}
      finished={workoutData.finished}
    >
      <View style={styles.headerContainer}>
        <CustomText style={styles.headerText}>{workoutData.name}</CustomText>
        <CustomText style={styles.headerSubText}>
          {formatDateFromISO(workoutData.date)}
        </CustomText>
        <View style={styles.listContainer}>
          <FlatList
            data={exercises}
            keyExtractor={(set) => set.id.toString()}
            renderItem={({ item }) => (
              <ExerciseSetsItem
                exercise={item}
                sets={sets.filter((set) => set.exerciseId === item.id)}
                selected={item.id === selectedExerciseId}
                onPress={setSelectedExerciseId}
              />
            )}
            ItemSeparatorComponent={() => (
              <View style={{ height: theme.Spacing.xs }} />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: theme.Spacing.sm,
            }}
            ListFooterComponent={
              <Pressable
                style={({ pressed }) => [
                  styles.toggleButton,
                  workoutData.finished && styles.toggleButtonActive,
                  pressed && { opacity: 0.8 },
                ]}
                onPress={handleFinishWorkout}
              >
                <CustomText
                  weight={theme.FontWeights.bold}
                  style={styles.toggleText}
                >
                  {workoutData.finished ? "Edit Workout" : "Finish Workout"}
                </CustomText>
              </Pressable>
            }
          />
        </View>
      </View>
    </AnimatedScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: theme.Spacing.md,
    flex: 1,
  },
  headerText: {
    fontSize: theme.FontSizes.xxxl,
    fontWeight: "bold",
    color: theme.Colors.text,
    marginBottom: theme.Spacing.sm,
  },
  headerSubText: {
    fontSize: theme.FontSizes.medium,
    color: theme.Colors.text_800,
    marginBottom: theme.Spacing.xs,
  },
  listContainer: {
    flex: 2,
    width: "100%",
  },
  exerciseContainer: {
    backgroundColor: theme.Colors.background,
    padding: 8,
  },
  columnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
  },
  toggleButton: {
    backgroundColor: theme.Colors.primary_30,
    padding: theme.Spacing.md,
    borderRadius: theme.Radius.md,
    marginBottom: theme.Spacing.sm,
    width: "100%",
    borderWidth: 1,
    borderColor: theme.Colors.background_800,
    alignSelf: "center",
  },
  toggleButtonActive: {
    backgroundColor: theme.Colors.background,
  },
  toggleText: {
    color: theme.Colors.primary,
    width: "100%",
    textAlign: "center",
    fontSize: theme.FontSizes.xl,
  },
});
