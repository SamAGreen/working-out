import * as SQLite from "expo-sqlite";
import { setupWorkoutDB } from "./exerciseDb";
import { setupExerciseDB } from "./workoutDb";

export type Set = {
  id: number;
  workoutId: number; // foreign key
  exerciseId: number; // foreign key
  Weight: number;
  Reps: number;
};

export const dbPromise = SQLite.openDatabaseAsync("database.db");

export async function clearDatabase() {
  const db = await dbPromise;
  await db.execAsync("DROP TABLE IF EXISTS exercises");
  await db.execAsync("DROP TABLE IF EXISTS workouts");
  console.log("They have been deleted");
}

export async function setupDB() {
  const db = await dbPromise;

  await db.withTransactionAsync(async () => {
    await setupWorkoutDB(db);
    await setupExerciseDB(db);
  });
}
