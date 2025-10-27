import * as SQLite from "expo-sqlite";

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
  db.execAsync("DROP TABLE IF EXISTS exercises");
  db.execAsync("DROP TABLE IF EXISTS workouts");
  console.log("They have been deleted");
}

export async function setupDB() {
  const db = await dbPromise;

  await db.withTransactionAsync(async () => {
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
  });

  await db.withTransactionAsync(async () => {
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
  });
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
