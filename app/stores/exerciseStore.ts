import { create } from "zustand";
import {
  addExerciseToDB,
  deleteExerciseFromDb,
  getAllExercisesFromDB,
  getExercisesByIdFromDb,
} from "../db/exerciseDb";
import { Exercise, ExerciseShell, Result } from "../util/dataTypes";

interface ExerciseState {
  exercises: Exercise[];
  getAllExercises: () => Promise<void>;
  getExercisesById: (ids: number[]) => Promise<Result<Exercise[]>>;
  addExercise: (exerciseShell: ExerciseShell) => Promise<Result<Exercise>>;
  deleteExercise: (id: number) => Promise<Result<void>>;
}

const useExerciseStore = create<ExerciseState>((set, get) => ({
  exercises: [],

  getAllExercises: async () => {
    try {
      const exercises = await getAllExercisesFromDB();
      set({ exercises: exercises });
    } catch (error) {
      console.log(error);
    }
  },

  getExercisesById: async (ids) => {
    try {
      const exercises = await getExercisesByIdFromDb(ids);
      return { success: true, data: exercises };
    } catch (error) {
      console.log(error);
      return { success: false, error: error as Error };
    }
  },

  addExercise: async (exerciseShell: ExerciseShell) => {
    try {
      const newExercise = await addExerciseToDB(exerciseShell);
      set({ exercises: [newExercise, ...get().exercises] });
      return { success: true, data: newExercise };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  },

  deleteExercise: async (id: number): Promise<Result<void>> => {
    try {
      await deleteExerciseFromDb(id);
      set({ exercises: get().exercises.filter((e) => e.id !== id) });
      return { success: true, data: undefined };
    } catch (error) {
      console.error("Delete failed:", error);
      return { success: false, error: error as Error };
    }
  },
}));

export const useExercises = () => useExerciseStore((state) => state.exercises);

export const useAddExercise = () =>
  useExerciseStore((state) => state.addExercise);

export const useDeleteExercise = () =>
  useExerciseStore((state) => state.deleteExercise);

export const useGetAllExercises = () =>
  useExerciseStore((state) => state.getAllExercises);

export const useGetExercises = () =>
  useExerciseStore((state) => state.getExercisesById);
