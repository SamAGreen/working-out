import { SQLiteDatabase } from "expo-sqlite";
import { Exercise, ExerciseShell, TrackingMetric } from "../util/dataTypes";
import { dbPromise } from "./database";

export async function setupWorkoutDB(db: SQLiteDatabase) {
  await db.execAsync(`
      CREATE TABLE IF NOT EXISTS exercises (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL UNIQUE,
        tracking_metric TEXT NOT NULL
      );
    `);

  const insertStatements: ExerciseShell[] = [
    { name: "Back Squat", trackingMetric: TrackingMetric.WEIGHT_REPS },
    { name: "Benchpress", trackingMetric: TrackingMetric.WEIGHT_REPS },
    { name: "Deadlift", trackingMetric: TrackingMetric.WEIGHT_REPS },
    { name: "Overhead Press", trackingMetric: TrackingMetric.WEIGHT_REPS },
    { name: "Pushup", trackingMetric: TrackingMetric.REPS },
    { name: "Front Squat", trackingMetric: TrackingMetric.WEIGHT_REPS },
    { name: "Bicep Curl", trackingMetric: TrackingMetric.WEIGHT_REPS },
    { name: "Lateral Raise", trackingMetric: TrackingMetric.WEIGHT_REPS },
    { name: "Leg Extension", trackingMetric: TrackingMetric.WEIGHT_REPS },
    { name: "Calf Raise", trackingMetric: TrackingMetric.WEIGHT_REPS },
    { name: "Leg Raise", trackingMetric: TrackingMetric.WEIGHT_REPS },
    { name: "Lying Leg Raise", trackingMetric: TrackingMetric.REPS },
    {
      name: "Bulgarian Split Squat",
      trackingMetric: TrackingMetric.WEIGHT_REPS,
    },
    {
      name: "Assault Bike",
      trackingMetric: TrackingMetric.CALORIES_TIME,
    },
    {
      name: "Sprints",
      trackingMetric: TrackingMetric.DISTANCE,
    },
    {
      name: "Plank",
      trackingMetric: TrackingMetric.TIME,
    },
    {
      name: "Run",
      trackingMetric: TrackingMetric.DISTANCE_TIME,
    },
    {
      name: "Farmer's Walk",
      trackingMetric: TrackingMetric.WEIGHT_DISTANCE,
    },
    {
      name: "Weighted Plank",
      trackingMetric: TrackingMetric.WEIGHT_TIME,
    },
  ];

  for (const exercise of insertStatements) {
    await db.runAsync(
      "INSERT OR IGNORE INTO exercises (name, tracking_metric) VALUES (?, ?);",
      exercise.name,
      exercise.trackingMetric
    );
  }
}

export async function getAllExercisesFromDB(): Promise<Exercise[]> {
  const db = await dbPromise;
  const rows = await db.getAllAsync<{
    id: number;
    name: string;
    tracking_metric: string;
  }>("SELECT * FROM exercises");

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    trackingMetric: row.tracking_metric as TrackingMetric, // map to camelCase
  }));
}

export async function addExerciseToDB(
  exerciseShell: ExerciseShell
): Promise<Exercise> {
  const db = await dbPromise;
  try {
    const insertResult = await db.runAsync(
      "INSERT INTO exercises (name, tracking_metric) VALUES (?, ?)",
      exerciseShell.name,
      exerciseShell.trackingMetric
    );

    const row = await db.getFirstAsync<{
      id: number;
      name: string;
      tracking_metric: string;
    }>("SELECT * FROM exercises WHERE id = ?", insertResult.lastInsertRowId);

    if (row) {
      return {
        id: row.id,
        name: row.name,
        trackingMetric: row.tracking_metric as TrackingMetric,
      };
    }

    return {
      id: -1,
      name: "yeah, that ain't right",
      trackingMetric: TrackingMetric.WEIGHT_TIME,
    };
  } catch (error) {
    console.error("There has been an error adding:", error);
    return {
      id: -1,
      name: "yeah, that ain't right",
      trackingMetric: TrackingMetric.WEIGHT_TIME,
    };
  }
}

export async function deleteExerciseFromDb(
  exerciseId: number
): Promise<boolean> {
  const db = await dbPromise;
  try {
    const result = await db.runAsync(
      "DELETE FROM exercises WHERE id = ?",
      exerciseId
    );
    if (result.changes === 1) {
      return true;
    } else {
      console.error("Delete fucked up, num deleted: " + result.changes);
      return false;
    }
  } catch (error) {
    console.error("Delete fucked up: ", error);
    return false;
  }
}

export async function getExercisesByIdFromDb(
  ids: number[]
): Promise<Exercise[]> {
  const db = await dbPromise;

  const placeholders = ids.map(() => "?").join(", ");

  const query = `SELECT * FROM exercises WHERE id IN (${placeholders})`;

  const rows = await db.getAllAsync<{
    id: number;
    name: string;
    tracking_metric: string;
  }>(query, ids);

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    trackingMetric: row.tracking_metric as TrackingMetric,
  }));
}
