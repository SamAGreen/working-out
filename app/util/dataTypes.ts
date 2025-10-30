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

export function MetricToNiceString(metric: TrackingMetric): string {
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
