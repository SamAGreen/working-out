import { SQLiteDatabase } from "expo-sqlite";
import { dbPromise } from "./database";

export type Workout = {
  id: number;
  name: string;
  date: string;
  duration: number | null;
};

export type WorkoutShell = {
  name: string;
  date: string;
  duration: number | null;
};

export async function getAllWorkouts(): Promise<Workout[]> {
  const db = await dbPromise;
  return db.getAllAsync<Workout>("SELECT * FROM workouts ORDER BY date DESC");
}

export async function addWorkout(workout: WorkoutShell): Promise<Workout> {
  const db = await dbPromise;
  try {
    const insertResult = await db.runAsync(
      "INSERT INTO workouts (name, date, duration) VALUES (?, ?, ?)",
      workout.name,
      workout.date,
      workout.duration,
    );

    const result = await db.getFirstAsync<Workout>(
      "SELECT * FROM workouts WHERE id = ?",
      insertResult.lastInsertRowId,
    );

    if (result) {
      return result;
    }

    return {
      id: -1,
      name: "yeah, that ain't right",
      date: "1970-01-01 00:00:00.000",
      duration: null,
    };
  } catch (error) {
    console.error("There has been an error adding a workout:", error);
    return {
      id: -1,
      name: "yeah, that ain't right",
      date: "1970-01-01 00:00:00.000",
      duration: null,
    };
  }
}

export async function deleteWorkout(workoutId: number): Promise<boolean> {
  const db = await dbPromise;
  try {
    const result = await db.runAsync(
      "DELETE FROM workouts WHERE id = ?",
      workoutId,
    );
    if (result.changes === 1) {
      return true;
    } else {
      console.error("Workout Delete fucked up, num deleted: " + result.changes);
      return false;
    }
  } catch (error) {
    console.error("Workout Delete fucked up:", error);
    return false;
  }
}

export async function setupExerciseDB(db: SQLiteDatabase) {
  await db.execAsync(`
      CREATE TABLE IF NOT EXISTS workouts (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        date TEXT NOT NULL,
        duration INTEGER
      );
    `);

  const check = await db.getFirstAsync<{ count: number }>(
    "SELECT COUNT(*) as count FROM workouts",
  );

  if (check?.count === 0) {
    const workouts = [
      { name: "Upper 6", date: "2025-10-10 00:00:00.000" },
      { name: "Lower 6", date: "2025-10-09 00:00:00.000" },
      { name: "Upper 5", date: "2025-10-08 00:00:00.000" },
      { name: "Lower 5", date: "2025-10-07 00:00:00.000" },
      { name: "Upper 4", date: "2025-10-06 00:00:00.000" },
      { name: "Lower 4", date: "2025-10-04 00:00:00.000" },
      { name: "Upper 3", date: "2025-10-03 00:00:00.000" },
      { name: "Lower 3", date: "2025-10-02 00:00:00.000" },
      { name: "Upper 2", date: "2025-10-01 00:00:00.000" },
      { name: "Lower 2", date: "2025-09-30 00:00:00.000" },
      { name: "Upper 1", date: "2025-09-27 00:00:00.000" },
      { name: "Lower 1", date: "2025-09-25 00:00:00.000" },
    ];

    for (const workout of workouts) {
      await db.runAsync(
        "INSERT OR IGNORE INTO workouts (name, date) VALUES (?, ?);",
        workout.name,
        workout.date,
      );
    }
  }
}
