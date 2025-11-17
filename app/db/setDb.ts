import { SQLiteDatabase } from "expo-sqlite";
import { Exercise, ExerciseSet, SetShell, Workout } from "../util/dataTypes";
import { getRandomInt } from "../util/util";
import { dbPromise } from "./database";

export async function setupSetDb(db: SQLiteDatabase) {
  await db.execAsync(`
      CREATE TABLE IF NOT EXISTS sets (
  id INTEGER PRIMARY KEY NOT NULL,
  workout_id INTEGER NOT NULL,
  exercise_id INTEGER NOT NULL,
  metric_value_one INTEGER NOT NULL,
  metric_value_two INTEGER,
  FOREIGN KEY (workout_id) REFERENCES workouts(id),
  FOREIGN KEY (exercise_id) REFERENCES exercises(id)
);
    `);

  const check = await db.getFirstAsync<{ count: number }>(
    "SELECT COUNT(*) as count FROM sets"
  );

  console.log(check);

  if (check?.count === 0) {
    const workouts = await db.getAllAsync<Workout>("SELECT * FROM workouts");

    const exercises = await db.getAllAsync<Exercise>("SELECT * FROM exercises");

    let sets: SetShell[] = [];

    for (const workout of workouts) {
      const availableExercises = [...exercises];
      for (
        let numExercise = 0;
        numExercise < getRandomInt(4, 8);
        numExercise++
      ) {
        if (availableExercises.length === 0) break;
        const randomIndex = getRandomInt(0, availableExercises.length - 1);
        const exercise = availableExercises.splice(randomIndex, 1)[0];

        for (let numSet = 0; numSet < getRandomInt(1, 4); numSet++) {
          sets.push({
            workoutId: workout.id,
            exerciseId: exercise.id,
            metricValueOne: getRandomInt(1, 100),
            metricValueTwo: getRandomInt(1, 15),
          });
        }
      }
    }
    for (const set of sets) {
      await db.runAsync(
        "INSERT INTO sets (workout_id, exercise_id, metric_value_one, metric_value_two) VALUES (?, ?, ?, ?);",
        set.workoutId,
        set.exerciseId,
        set.metricValueOne,
        set.metricValueTwo
      );
    }
  }
}

export async function getSetsByWorkoutIdFromDb(
  id: number
): Promise<ExerciseSet[]> {
  const db = await dbPromise;

  const sets = await db.getAllAsync<{
    id: number;
    workout_id: number;
    exercise_id: number;
    metric_value_one: number;
    metric_value_two: number | null;
  }>("SELECT * FROM sets where workout_id = ?", id);
  return sets.map((set) => ({
    id: set.id,
    workoutId: set.workout_id,
    exerciseId: set.exercise_id,
    metricValueOne: set.metric_value_one,
    metricValueTwo: set.metric_value_two,
  }));
}

export async function setSetByIdToDb(
  id: number,
  whichMetric: number,
  newValue: number
): Promise<number> {
  const db = await dbPromise;
  const command = `UPDATE sets SET ${whichMetric === 1 ? "metric_value_one" : "metric_value_two"} = ${newValue} WHERE id = ${id}`;
  const editResult = await db.runAsync(command);
  return editResult.changes;
}

export async function addSetToDB(set: SetShell): Promise<ExerciseSet> {
  const db = await dbPromise;
  try {
    const insertResult = await db.runAsync(
      "INSERT INTO sets (workout_id, exercise_id, metric_value_one, metric_value_two) VALUES (?, ?, ?, ?)",
      set.workoutId,
      set.exerciseId,
      set.metricValueOne,
      set.metricValueTwo
    );

    const result = await db.getFirstAsync<{
      id: number;
      exercise_id: number;
      workout_id: number;
      metric_value_one: number;
      metric_value_two: number | null;
    }>("SELECT * FROM sets WHERE id = ?", insertResult.lastInsertRowId);

    if (result) {
      return {
        id: result.id,
        workoutId: result.workout_id,
        exerciseId: result.exercise_id,
        metricValueOne: result.metric_value_one,
        metricValueTwo: result.metric_value_two,
      };
    }

    return {
      id: -1,
      workoutId: -1,
      exerciseId: -1,
      metricValueOne: -1,
      metricValueTwo: null,
    };
  } catch (error) {
    console.error("There has been an error adding a workout:", error);
    return {
      id: -1,
      workoutId: -1,
      exerciseId: -1,
      metricValueOne: -1,
      metricValueTwo: null,
    };
  }
}
