import { create } from "zustand";
import {
  addWorkoutToDb,
  deleteWorkoutFromDb,
  getAllWorkoutsFromDb,
  getWorkoutFromDb,
  setWorkoutFinishedDb,
} from "../db/workoutDb";
import { Result, Workout, WorkoutShell } from "../util/dataTypes";

interface WorkoutState {
  workouts: Workout[];
  getWorkout: (id: number) => Promise<Result<Workout>>;
  getAllWorkouts: () => Promise<void>;
  addWorkout: (workoutShell: WorkoutShell) => Promise<Result<void>>;
  deleteWorkout: (id: number) => Promise<Result<void>>;
  setWorkoutFinished: (id: number, finished: boolean) => Promise<Result<void>>;
}

const useWorkoutsStore = create<WorkoutState>((set, get) => ({
  workouts: [],

  getWorkout: async (id) => {
    try {
      const workout = await getWorkoutFromDb(id);
      return { success: true, data: workout };
    } catch (error) {
      console.error("Failed to get workout:", error);
      return { success: false, error: error as Error };
    }
  },

  getAllWorkouts: async () => {
    try {
      const workouts = await getAllWorkoutsFromDb();
      set({ workouts });
    } catch (error) {
      console.error("Failed to get workouts:", error);
    }
  },

  addWorkout: async (workoutShell) => {
    try {
      const newWorkout = await addWorkoutToDb(workoutShell);
      set({ workouts: [newWorkout, ...get().workouts] });
      return { success: true, data: undefined };
    } catch (error) {
      console.error("Add workout failed:", error);
      return { success: false, error: error as Error };
    }
  },

  deleteWorkout: async (id) => {
    try {
      await deleteWorkoutFromDb(id);
      set({ workouts: get().workouts.filter((e) => e.id !== id) });
      return { success: true, data: undefined };
    } catch (error) {
      console.error("Delete workout failed:", error);
      return { success: false, error: error as Error };
    }
  },

  setWorkoutFinished: async (id, finished) => {
    try {
      await setWorkoutFinishedDb(id, finished);
      set({
        workouts: get().workouts.map((w) =>
          w.id === id ? { ...w, finished } : w
        ),
      });
      return { success: true, data: undefined };
    } catch (error) {
      console.error("Set workout finished failed:", error);
      return { success: false, error: error as Error };
    }
  },
}));

export const useWorkouts = () => useWorkoutsStore((state) => state.workouts);

export const useAddWorkout = () =>
  useWorkoutsStore((state) => state.addWorkout);

export const useDeleteWorkout = () =>
  useWorkoutsStore((state) => state.deleteWorkout);

export const useGetAllWorkouts = () =>
  useWorkoutsStore((state) => state.getAllWorkouts);

export const useGetWorkout = () =>
  useWorkoutsStore((state) => state.getWorkout);

export const useSetWorkoutFinished = () =>
  useWorkoutsStore((state) => state.setWorkoutFinished);
