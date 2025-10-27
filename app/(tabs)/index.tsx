import { Image } from "expo-image";
import { FlatList, StyleSheet, View } from "react-native";
import AddItemModal from "../components/AddItemModal";
import ScreenWrapper from "../components/ScreenWrapper";
import WorkoutListItem from "../components/WorkoutListItem";
import { addWorkout, WorkoutShell } from "../db/database";
import { useAddLocation } from "../hooks/useAddStore";
import { useWorkouts } from "../hooks/useWorkouts";
import { theme } from "../styling/stylingStandards";
import { getCurrentTimestamp } from "../util/time";

export default function Index() {
  const { allWorkouts, addWorkoutToList } = useWorkouts();

  const localLocation = "home";
  const plusLocation = useAddLocation((state) => state.plusLocation);
  const resetAddLocation = useAddLocation((state) => state.resetAddLocation);

  const createWorkoutShell = (name: string): WorkoutShell => {
    return {
      name: name,
      date: getCurrentTimestamp(),
      duration: null,
    };
  };

  const image = require("../../assets/images/thedon.jpg");

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
          data={allWorkouts}
          renderItem={({ item }) => <WorkoutListItem workout={item} />}
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
        onAddToList={addWorkoutToList}
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
