import { SQLiteDatabase } from "expo-sqlite";
import { dbPromise } from "./database";

export enum TrackingMetric {
  DISTANCE = "distance",
  DISTANCE_TIME = "distance_time",
  DISTANCE_WEIGHT = "distance_weight",
  DURATION = "duration",
  DURATION_CALORIES = "duration_calories",
  DURATION_WEIGHT = "duration_weight",
  REPS = "reps",
  REPS_WEIGHT = "reps_weight",
  TIME = "time",
}

export function MetricToNiceString(metric: TrackingMetric): string {
  switch (metric) {
    case TrackingMetric.DISTANCE:
      return "Distance";
    case TrackingMetric.DISTANCE_TIME:
      return "Distance/Time";
    case TrackingMetric.DISTANCE_WEIGHT:
      return "Weight/Distance";
    case TrackingMetric.DURATION:
      return "Duration";
    case TrackingMetric.DURATION_CALORIES:
      return "Duration/Calories";
    case TrackingMetric.DURATION_WEIGHT:
      return "Weight/Duration";
    case TrackingMetric.REPS:
      return "Reps";
    case TrackingMetric.REPS_WEIGHT:
      return "Weight/Reps";
    case TrackingMetric.TIME:
      return "Time";
  }
}

export type Exercise = {
  id: number;
  name: string;
  trackingMetric: TrackingMetric;
};

export type ExerciseShell = {
  name: string;
  trackingMetric: TrackingMetric;
};

export async function setupWorkoutDB(db: SQLiteDatabase) {
  await db.execAsync(`
      CREATE TABLE IF NOT EXISTS exercises (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL UNIQUE,
        tracking_metric TEXT NOT NULL
      );
    `);

  const insertStatements: ExerciseShell[] = [
    { name: "Back Squat", trackingMetric: TrackingMetric.REPS_WEIGHT },
    { name: "Benchpress", trackingMetric: TrackingMetric.REPS_WEIGHT },
    { name: "Deadlift", trackingMetric: TrackingMetric.REPS_WEIGHT },
    { name: "Overhead Press", trackingMetric: TrackingMetric.REPS_WEIGHT },
    { name: "Pushup", trackingMetric: TrackingMetric.REPS },
    { name: "Front Squat", trackingMetric: TrackingMetric.REPS_WEIGHT },
    { name: "Bicep Curl", trackingMetric: TrackingMetric.REPS_WEIGHT },
    { name: "Lateral Raise", trackingMetric: TrackingMetric.REPS_WEIGHT },
    { name: "Leg Extension", trackingMetric: TrackingMetric.REPS_WEIGHT },
    { name: "Calf Raise", trackingMetric: TrackingMetric.REPS_WEIGHT },
    { name: "Leg Raise", trackingMetric: TrackingMetric.REPS_WEIGHT },
    { name: "Lying Leg Raise", trackingMetric: TrackingMetric.REPS },
    {
      name: "Bulgarian Split Squat",
      trackingMetric: TrackingMetric.REPS_WEIGHT,
    },
    {
      name: "Assault Bike",
      trackingMetric: TrackingMetric.DURATION_CALORIES,
    },
  ];

  for (const exercise of insertStatements) {
    await db.runAsync(
      "INSERT OR IGNORE INTO exercises (name, tracking_metric) VALUES (?, ?);",
      exercise.name,
      exercise.trackingMetric,
    );
  }
}

export async function getExercises(): Promise<Exercise[]> {
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

export async function addExercise(exercise: ExerciseShell): Promise<Exercise> {
  const db = await dbPromise;
  try {
    const insertResult = await db.runAsync(
      "INSERT INTO exercises (name, tracking_metric) VALUES (?, ?)",
      exercise.name,
      exercise.trackingMetric,
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
      trackingMetric: TrackingMetric.DURATION_WEIGHT,
    };
  } catch (error) {
    console.error("There has been an error adding:", error);
    return {
      id: -1,
      name: "yeah, that ain't right",
      trackingMetric: TrackingMetric.DURATION_WEIGHT,
    };
  }
}

export async function deleteExercise(exerciseId: number): Promise<boolean> {
  const db = await dbPromise;
  try {
    const result = await db.runAsync(
      "DELETE FROM exercises WHERE id = ?",
      exerciseId,
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
