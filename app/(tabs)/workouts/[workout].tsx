import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import AnimatedScreenWrapper from "@/app/components/AnimatedScreenWrapper";
import ScreenWrapper from "@/app/components/ScreenWrapper";
import {
  useGetWorkout,
  useSetWorkoutFinished,
} from "@/app/stores/workoutStore";
import { theme } from "@/app/styling/stylingStandards";

export default function WorkoutPage() {
  const { workout } = useLocalSearchParams<{ workout: string }>();
  const [loading, setLoading] = useState(true);
  const [workoutData, setWorkoutData] = useState<null | {
    id: number;
    name: string;
    date: string;
    finished: boolean;
  }>(null);

  const setWorkoutFinished = useSetWorkoutFinished();
  const getWorkout = useGetWorkout();

  useEffect(() => {
    const fetchData = async () => {
      if (!workout) return;
      setLoading(true);
      try {
        const result = await getWorkout(+workout);
        if (result.success) {
          setWorkoutData(result.data);
        }
      } catch (error) {
        console.error("Error loading workout page:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [workout, getWorkout]);

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
        <Text style={styles.headerText}>{workoutData.name}</Text>
        <Text style={styles.headerSubText}>Date: {workoutData.date}</Text>
      </View>

      <Pressable
        style={[
          styles.toggleButton,
          workoutData.finished && styles.toggleButtonActive,
        ]}
        onPress={handleFinishWorkout}
      >
        <Text style={styles.toggleText}>
          {workoutData.finished ? "Edit Workout" : "Finish Workout"}
        </Text>
      </Pressable>
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
  },
  headerText: {
    fontSize: theme.FontSizes.xl,
    fontWeight: "bold",
    color: theme.Colors.text,
    marginBottom: theme.Spacing.sm,
  },
  headerSubText: {
    fontSize: theme.FontSizes.medium,
    color: theme.Colors.text_800,
    marginBottom: theme.Spacing.xs,
  },
  toggleButton: {
    backgroundColor: theme.Colors.background,
    paddingHorizontal: theme.Spacing.lg,
    paddingVertical: theme.Spacing.sm,
    borderRadius: theme.Radius.md,
    margin: theme.Spacing.md,
    alignItems: "center",
  },
  toggleButtonActive: {
    backgroundColor: theme.Colors.primary_100,
  },
  toggleText: {
    color: theme.Colors.text,
    fontWeight: "600",
  },
});
