import { SQLiteDatabase } from "expo-sqlite";
import { Workout, WorkoutShell } from "../util/dataTypes";
import { dbPromise } from "./database";

export async function getWorkoutFromDb(id: number): Promise<Workout> {
  const db = await dbPromise;
  const result = await db.getFirstAsync<Workout>(
    "SELECT * FROM workouts WHERE id = ?",
    id
  );
  if (result) {
    return {
      id: result.id,
      name: result.name,
      date: result.date,
      duration: result.duration,
      finished: result.finished ? true : false,
    };
  }

  return {
    id: -1,
    name: "yeah, that ain't right",
    date: "1970-01-01 00:00:00.000",
    duration: null,
    finished: true,
  };
}

export async function setWorkoutFinishedDb(
  id: number,
  finished: boolean
): Promise<number> {
  const db = await dbPromise;
  const editResult = await db.runAsync(
    "UPDATE workouts SET finished = ? WHERE id = ?",
    finished ? 1 : 0,
    id
  );
  return editResult.changes;
}

export async function getAllWorkoutsFromDb(): Promise<Workout[]> {
  const db = await dbPromise;
  const result = await db.getAllAsync<Workout>(
    "SELECT * FROM workouts ORDER BY date DESC"
  );
  return result.map((workout) => ({
    id: workout.id,
    name: workout.name,
    date: workout.date,
    duration: workout.duration,
    finished: workout.finished as boolean,
  }));
}

export async function addWorkoutToDb(workout: WorkoutShell): Promise<Workout> {
  const db = await dbPromise;
  try {
    const insertResult = await db.runAsync(
      "INSERT INTO workouts (name, date, duration, finished) VALUES (?, ?, ?, ?)",
      workout.name,
      workout.date,
      workout.duration,
      workout.finished
    );

    const result = await db.getFirstAsync<Workout>(
      "SELECT * FROM workouts WHERE id = ?",
      insertResult.lastInsertRowId
    );

    if (result) {
      return {
        id: result.id,
        name: result.name,
        date: result.date,
        duration: result.duration,
        finished: result.finished as boolean,
      };
    }

    return {
      id: -1,
      name: "yeah, that ain't right",
      date: "1970-01-01 00:00:00.000",
      duration: null,
      finished: true,
    };
  } catch (error) {
    console.error("There has been an error adding a workout:", error);
    return {
      id: -1,
      name: "yeah, that ain't right",
      date: "1970-01-01 00:00:00.000",
      duration: null,
      finished: true,
    };
  }
}

export async function deleteWorkoutFromDb(workoutId: number): Promise<boolean> {
  const db = await dbPromise;
  try {
    const result = await db.runAsync(
      "DELETE FROM workouts WHERE id = ?",
      workoutId
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
        duration INTEGER,
        finished INTEGER
      );
    `);

  const check = await db.getFirstAsync<{ count: number }>(
    "SELECT COUNT(*) as count FROM workouts"
  );

  if (check?.count === 0) {
    const workouts: WorkoutShell[] = [
      {
        name: "Upper 6",
        date: "2025-10-10 00:00:00.000",
        duration: null,
        finished: 0,
      },
      {
        name: "Lower 6",
        date: "2025-10-09 00:00:00.000",
        duration: null,
        finished: 1,
      },
      {
        name: "Upper 5",
        date: "2025-10-08 00:00:00.000",
        duration: null,
        finished: 0,
      },
      {
        name: "Lower 5",
        date: "2025-10-07 00:00:00.000",
        duration: null,
        finished: 1,
      },
      {
        name: "Upper 4",
        date: "2025-10-06 00:00:00.000",
        duration: null,
        finished: 1,
      },
      {
        name: "Lower 4",
        date: "2025-10-04 00:00:00.000",
        duration: null,
        finished: 0,
      },
      {
        name: "Upper 3",
        date: "2025-10-03 00:00:00.000",
        duration: null,
        finished: 1,
      },
      {
        name: "Lower 3",
        date: "2025-10-02 00:00:00.000",
        duration: null,
        finished: 0,
      },
      {
        name: "Upper 2",
        date: "2025-10-01 00:00:00.000",
        duration: null,
        finished: 1,
      },
      {
        name: "Lower 2",
        date: "2025-09-30 00:00:00.000",
        duration: null,
        finished: 0,
      },
      {
        name: "Upper 1",
        date: "2025-09-27 00:00:00.000",
        duration: null,
        finished: 0,
      },
      {
        name: "Lower 1",
        date: "2025-09-25 00:00:00.000",
        duration: null,
        finished: 0,
      },
    ];

    for (const workout of workouts) {
      await db.runAsync(
        "INSERT OR IGNORE INTO workouts (name, date, duration, finished) VALUES (?, ?, ?, ?);",
        workout.name,
        workout.date,
        workout.duration,
        workout.finished
      );
    }
  }
}
