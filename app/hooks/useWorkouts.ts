import { useEffect, useState } from 'react';
import { Workout, getAllWorkouts } from '../db/database';

export function useWorkouts() {
  const [allWorkouts, setAllWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    getAllWorkouts()
      .then((rows) => setAllWorkouts(rows))
      .catch((err) => console.error('Failed to load workouts:', err));
  }, []);

  return {
    allWorkouts,
  };
}
