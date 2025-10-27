import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Workout } from "../db/workoutDb";
import { theme } from "../styling/stylingStandards";
import { formatDate } from "../util/time";
import CustomText from "./CustomText";

interface WorkoutListItemProps {
  workout: Workout;
}

const WorkoutListItem: React.FC<WorkoutListItemProps> = ({ workout }) => {
  const router = useRouter();

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && { opacity: 0.7 }]}
      onPress={() =>
        router.push({
          pathname: "/workouts/[workout]",
          params: { workout: workout.id },
        })
      }
    >
      <CustomText
        size={theme.FontSizes.xxl}
        weight={theme.FontWeights.bold}
        color={theme.Colors.text}
      >
        {workout.name}
      </CustomText>

      <View style={styles.details}>
        <CustomText
          size={theme.FontSizes.medium}
          weight={theme.FontWeights.regular}
          color={theme.Colors.text}
        >
          {formatDate(workout.date)}
        </CustomText>
        <CustomText
          size={theme.FontSizes.medium}
          weight={theme.FontWeights.regular}
          color={theme.Colors.text}
        >
          {workout.duration ?? "-"}
        </CustomText>
      </View>
    </Pressable>
  );
};

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
  details: {
    marginTop: theme.Spacing.xs,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default WorkoutListItem;
