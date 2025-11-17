import { create } from "zustand";
import {
  addSetToDB,
  getSetsByWorkoutIdFromDb,
  setSetByIdToDb,
} from "../db/setDb";
import { ExerciseSet, Result, SetShell } from "../util/dataTypes";

interface SetState {
  sets: ExerciseSet[];
  getSetsByWorkoutId: (id: number) => Promise<Result<null>>;
  setSetById: (
    id: number,
    whichMetric: number,
    newValue: number
  ) => Promise<Result<null>>;
  addSet: (setShell: SetShell) => Promise<Result<null>>;
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

  setSetById: async (id, whichMetric, newValue) => {
    try {
      const result = await setSetByIdToDb(id, whichMetric, newValue);

      if (result === 1) {
        set((state) => ({
          sets: state.sets.map((s) =>
            s.id === id
              ? whichMetric === 1
                ? { ...s, metricValueOne: newValue }
                : { ...s, metricValueTwo: newValue }
              : s
          ),
        }));
      }

      return { success: true, data: null };
    } catch (error) {
      console.error("Failed to update set:", error);
      return { success: false, error: error as Error };
    }
  },

  addSet: async (setShell) => {
    try {
      const newSet = await addSetToDB(setShell);
    
      set({ sets: [...get().sets, newSet]});
      
      return { success: true, data: null };
    } catch (error) {
      return { success: true, data: null };
    }
  },
}));

export const useGetSets = () =>
  useSetStore((state) => state.getSetsByWorkoutId);

export const useSets = () => useSetStore((state) => state.sets);

export const useUpdateSet = () => useSetStore((state) => state.setSetById);

export const useAddSet = () => useSetStore((state) => state.addSet);
