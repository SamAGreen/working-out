import { useEffect, useState } from "react";
import { Exercise, getExercises } from "../db/exerciseDb";

export function useExercises() {
  const [allExercises, setAllExercises] = useState<Exercise[]>([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    getExercises()
      .then((rows) => setAllExercises(rows))
      .catch((err) => console.error("Failed to load exercises:", err));
  }, []);

  const handleSearch = (text: string) => {
    setSearchValue(text);
  };

  const addExerciseToList = (exercise: Exercise) => {
    setAllExercises((prev) => [exercise, ...prev]);
  };

  const removeExerciseFromList = (exercise: Exercise) => {
    setAllExercises((prev) => prev.filter((item) => item.id !== exercise.id));
  };

  const filteredExercises = allExercises.filter((exercise) =>
    exercise.name.toUpperCase().includes(searchValue.toUpperCase()),
  );

  return {
    filteredExercises,
    searchValue,
    handleSearch,
    addExerciseToList,
    removeExerciseFromList,
  };
}
