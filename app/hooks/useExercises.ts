import { useEffect, useState } from 'react';
import { getExercises, Exercise } from '../db/database';

export function useExercises() {
  const [allExercises, setAllExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [searchValue, setSearchValue] = useState('');


  useEffect(() => {
    getExercises()
      .then((rows) => {
        setAllExercises(rows);
        setFilteredExercises(rows);
      })
      .catch((err) => {
        console.error('Failed to load exercises:', err);
      });
  }, []);


  const handleSearch = (text: string) => {
    setSearchValue(text);

    const upperText = text.toUpperCase();
    const filtered = allExercises.filter((exercise) =>
      exercise.name.toUpperCase().includes(upperText)
    );

    setFilteredExercises(filtered);
  };

  const addExerciseToList = (exercise: Exercise) => {
    const newExerciseList = [...allExercises, exercise]
    setAllExercises(newExerciseList);

    const upperSearch = searchValue.toUpperCase();
    const shouldBeVisible = exercise.name.toUpperCase().includes(upperSearch);

    if (shouldBeVisible) {
      setFilteredExercises([...filteredExercises, exercise]);
    }
  }

  return {
    filteredExercises,
    searchValue,
    handleSearch,
    addExerciseToList
  };
}
