import { Image } from "expo-image";
import { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import AddItemModal from "../components/AddItemModal";
import ScreenWrapper from "../components/ScreenWrapper";
import WorkoutListItem from "../components/WorkoutListItem";
import { useAddLocation } from "../stores/addLocationStore";
import {
  useAddWorkout,
  useDeleteWorkout,
  useGetAllWorkouts,
  useWorkouts,
} from "../stores/workoutStore";
import { theme } from "../styling/stylingStandards";
import { WorkoutShell } from "../util/dataTypes";
import { getCurrentTimestamp } from "../util/time";

export default function Index() {
  const workouts = useWorkouts();
  const getAllWorkouts = useGetAllWorkouts();
  const deleteWorkout = useDeleteWorkout();
  const addWorkout = useAddWorkout();

  const localLocation = "home";
  const plusLocation = useAddLocation((state) => state.plusLocation);
  const resetAddLocation = useAddLocation((state) => state.resetAddLocation);

  const createWorkoutShell = (name: string): WorkoutShell => {
    return {
      name: name,
      date: getCurrentTimestamp(),
      duration: null,
      finished: 0,
    };
  };

  const image = require("../../assets/images/thedon.jpg");

  useEffect(() => {
    (async () => {
      await getAllWorkouts();
    })();
  }, [getAllWorkouts]);

  const handleDelete = async (id: number) => {
    const result = await deleteWorkout(id);
    if (!result.success) {
      console.log("Something went wrong handling delete: ", result.error);
    }
  };

  return (
    <ScreenWrapper style={styles.container}>
      <View style={styles.calendarContainer}>
        <Image
          source={image}
          contentFit="cover"
          style={styles.calendarContainer}
        />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={workouts}
          renderItem={({ item }) => (
            <WorkoutListItem workout={item} handleDelete={handleDelete} />
          )}
          style={styles.list}
          ItemSeparatorComponent={() => (
            <View style={{ height: theme.Spacing.xs }} />
          )}
        />
      </View>
      <AddItemModal
        visible={plusLocation === localLocation}
        onClose={resetAddLocation}
        onAdd={addWorkout}
        createShell={createWorkoutShell}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: theme.Spacing.md,
  },
  calendarContainer: {
    width: "100%",
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.Radius.md,
  },
  listContainer: {
    width: "100%",
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.Radius.md,
  },
  list: {
    width: "100%",
  },
});
