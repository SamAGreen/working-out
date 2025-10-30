import { create } from "zustand";
import { ExerciseSet, getSetsByWorkoutIdFromDb } from "../db/setDb";
import { Result } from "../util/dataTypes";

interface SetState {
  sets: ExerciseSet[];
  getSetsByWorkoutId: (id: number) => Promise<Result<null>>;
}

const useSetStore = create<SetState>((set, get) => ({
  sets: [],

  getSetsByWorkoutId: async (id) => {
    try {
      const sets = await getSetsByWorkoutIdFromDb(id);
      set({ sets: sets });
      return { success: true, data: null };
    } catch (error) {
      console.error("Failed to get sets:", error);
      return { success: false, error: error as Error };
    }
  },
}));

export const useGetSets = () =>
  useSetStore((state) => state.getSetsByWorkoutId);

export const useSets = () => useSetStore((state) => state.sets);
