import { useEffect, useState } from "react";
import { Workout, getAllWorkouts } from "../db/workoutDb";

export function useWorkouts() {
  const [allWorkouts, setAllWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    getAllWorkouts()
      .then((rows) => setAllWorkouts(rows))
      .catch((err) => console.error("Failed to load workouts:", err));
  }, []);

  const addWorkoutToList = (workout: Workout) => {
    setAllWorkouts((prev) => [workout, ...prev]);
  };

  const removeWorkoutFromList = (workout: Workout) => {
    setAllWorkouts((prev) => prev.filter((item) => item.id !== workout.id));
  };

  return {
    allWorkouts,
    addWorkoutToList,
    removeWorkoutFromList,
  };
}
