import * as SQLite from "expo-sqlite";
import { setupWorkoutDB } from "./exerciseDb";
import { setupExerciseDB } from "./workoutDb";
import { setupSetDb } from "./setDb";

export const dbPromise = SQLite.openDatabaseAsync("database.db");

export async function clearDatabase() {
  const db = await dbPromise;
  await db.execAsync("DROP TABLE IF EXISTS exercises");
  await db.execAsync("DROP TABLE IF EXISTS workouts");
  await db.execAsync("DROP TABLE IF EXISTS sets");
  console.log("They have been deleted");
}

export async function setupDB() {
  const db = await dbPromise;

  await db.withTransactionAsync(async () => {
    await db.execAsync("PRAGMA foreign_keys = ON;");
    await setupWorkoutDB(db);
    await setupExerciseDB(db);
    await setupSetDb(db)
  });
}
