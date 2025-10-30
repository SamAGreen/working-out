import { Image } from "expo-image";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import AddWorkoutItem from "../components/AddWorkoutItem";
import DeleteItemModal from "../components/DeleteItemModal";
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
import { Workout, WorkoutShell } from "../util/dataTypes";

export default function Index() {
  const workouts = useWorkouts();
  const getAllWorkouts = useGetAllWorkouts();
  const deleteWorkout = useDeleteWorkout();
  const addWorkout = useAddWorkout();

  const localLocation = "home";
  const plusLocation = useAddLocation((state) => state.plusLocation);
  const resetAddLocation = useAddLocation((state) => state.resetAddLocation);

  const image = require("../../assets/images/thedon.jpg");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [workoutToDelete, setWorkoutToDelete] = useState<Workout | null>(null);

  useEffect(() => {
    (async () => {
      await getAllWorkouts();
    })();
  }, [getAllWorkouts]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        resetAddLocation();
      };
    }, [resetAddLocation])
  );

  const handleAdd = async (workout: WorkoutShell) => {
    resetAddLocation();
    const result = await addWorkout(workout);
    if (!result.success) {
      console.log("Something went wrong handling delete: ", result.error);
    }
  };

  const handleLongPress = useCallback((workout: Workout) => {
    setWorkoutToDelete(workout);
    setShowDeleteModal(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (workoutToDelete) {
      const result = await deleteWorkout(workoutToDelete.id);
      if (!result.success) {
        console.log("Something went wrong handling delete: ", result.error);
      }
      setShowDeleteModal(false);
      setWorkoutToDelete(null);
    }
  }, [workoutToDelete]);

  const renderWorkoutItem = useCallback(
    ({ item }: { item: Workout }) => (
      <WorkoutListItem
        workout={item}
        onPress={(id) =>
          router.push({
            pathname: "/workouts/[workout]",
            params: { workout: id },
          })
        }
        onLongPress={handleLongPress}
      />
    ),
    [handleLongPress]
  );

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
        {plusLocation === localLocation && (
          <AddWorkoutItem handleAdd={handleAdd} />
        )}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={workouts}
          renderItem={renderWorkoutItem}
          style={styles.list}
          ItemSeparatorComponent={() => (
            <View style={{ height: theme.Spacing.xs }} />
          )}
        />
        <DeleteItemModal
          showModal={showDeleteModal}
          setShowModal={setShowDeleteModal}
          itemName={workoutToDelete?.name ?? ""}
          itemType={"Workout"}
          handleDelete={handleConfirmDelete}
        />
      </View>
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
