export type Result<T> =
  | { success: true; data: T }
  | { success: false; error: Error };

export enum TrackingMetric {
  WEIGHT_REPS = "WEIGHT_REPS",
  REPS = "reps",
  CALORIES_TIME = "calories_time",
  TIME = "time",
  DISTANCE = "distance",
  DISTANCE_TIME = "distance_time",
  WEIGHT_DISTANCE = "weight_distance",
  WEIGHT_TIME = "weight_time",
}

export function metricToNiceString(metric: TrackingMetric): string {
  switch (metric) {
    case TrackingMetric.WEIGHT_REPS:
      return "Weight/Reps";
    case TrackingMetric.REPS:
      return "Reps";
    case TrackingMetric.CALORIES_TIME:
      return "Calories/Time";
    case TrackingMetric.TIME:
      return "Time";
    case TrackingMetric.DISTANCE:
      return "Distance";
    case TrackingMetric.DISTANCE_TIME:
      return "Distance/Time";
    case TrackingMetric.WEIGHT_DISTANCE:
      return "Weight/Distance";
    case TrackingMetric.WEIGHT_TIME:
      return "Weight/Time";
  }
}

export function metricToUnits(metric: TrackingMetric): string[] {
  switch (metric) {
    case TrackingMetric.WEIGHT_REPS:
      return ["kg"];
    case TrackingMetric.REPS:
      return [];
    case TrackingMetric.CALORIES_TIME:
      return ["kcal", "s"];
    case TrackingMetric.TIME:
      return ["s"];
    case TrackingMetric.DISTANCE:
      return ["km"];
    case TrackingMetric.DISTANCE_TIME:
      return ["km", "s"];
    case TrackingMetric.WEIGHT_DISTANCE:
      return ["kg", "m"];
    case TrackingMetric.WEIGHT_TIME:
      return ["kg", "s"];
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
  finished: boolean;
};

export type WorkoutShell = {
  name: string;
  date: string;
  duration: number | null;
  finished: number;
};

export type ExerciseSet = {
  id: number;
  workoutId: number; // foreign key
  exerciseId: number; // foreign key
  metricValueOne: number; // e.g. Weight
  metricValueTwo: number | null; // Reps
};

export type SetShell = {
  workoutId: number;
  exerciseId: number;
  metricValueOne: number;
  metricValueTwo: number | null;
};
