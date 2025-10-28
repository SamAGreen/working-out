export type Result<T> =
  | { success: true; data: T }
  | { success: false; error: Error };

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
  finished: boolean;
};

export type WorkoutShell = {
  name: string;
  date: string;
  duration: number | null;
  finished: number;
};
