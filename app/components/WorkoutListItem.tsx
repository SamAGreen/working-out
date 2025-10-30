import React, { memo } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { theme } from "../styling/stylingStandards";
import { Workout } from "../util/dataTypes";
import { formatDateFromISO } from "../util/time";
import CustomText from "./CustomText";

interface WorkoutListItemProps {
  workout: Workout;
  onPress: (id: number) => void;
  onLongPress: (workout: Workout) => void;
}

const WorkoutListItem: React.FC<WorkoutListItemProps> = React.memo(
  ({ workout, onPress, onLongPress }) => {
    return (
      <Pressable
        style={({ pressed }) => [
          styles.container,
          pressed && { opacity: 0.7 },
          !workout.finished && { backgroundColor: theme.Colors.primary_100 },
        ]}
        onPress={() => onPress(workout.id)}
        onLongPress={() => onLongPress(workout)}
      >
        <CustomText
          size={theme.FontSizes.xxl}
          weight={theme.FontWeights.bold}
          color={theme.Colors.text}
        >
          {workout.name}
        </CustomText>

        <View style={styles.details}>
          <CustomText size={theme.FontSizes.medium} color={theme.Colors.text}>
            {formatDateFromISO(workout.date)}
          </CustomText>
          <CustomText size={theme.FontSizes.medium} color={theme.Colors.text}>
            {workout.duration ?? "-"}
          </CustomText>
        </View>
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
  details: {
    marginTop: theme.Spacing.xs,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default memo(WorkoutListItem);
