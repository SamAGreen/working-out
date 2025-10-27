import { useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import AnimatedScreenWrapper from "@/app/components/AnimatedScreenWrapper";
import ScreenWrapper from "@/app/components/ScreenWrapper";
import { getWorkout, setWorkoutFinished } from "@/app/db/workoutDb";
import { theme } from "@/app/styling/stylingStandards";

export default function WorkoutPage() {
  const { workout } = useLocalSearchParams<{ workout: string }>();
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [workoutData, setWorkoutData] = useState<null | {
    id: number;
    name: string;
    date: string;
    finished: boolean;
  }>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!workout) return;

        const workoutData = await getWorkout(workout);
        setWorkoutData(workoutData);
        setFinished(workoutData.finished);
      } catch (error) {
        console.error("Error loading workout page:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
     console.log("Finished: ", finished)
  }, [workout]);

  const handleFinishWorkout = () => {
    setFinished(!workoutData?.finished);
    setWorkoutFinished(workout, !workoutData?.finished)
      .then((result) => {
        if (result !== 1) {
          setFinished(!finished);
          console.log("Well that didn't work out");
        }
      })
      .catch((error) => console.log("Error!: ", error));
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
    <AnimatedScreenWrapper style={styles.container} finished={finished}>
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
  list: {
    width: "100%",
  },
});
