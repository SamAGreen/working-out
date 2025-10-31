import { Pressable, StyleSheet, View } from "react-native";
import { ExerciseSet } from "../db/setDb";
import { theme } from "../styling/stylingStandards";
import { Exercise, metricToNiceString } from "../util/dataTypes";
import CustomText from "./CustomText";

interface ExerciseSetsItemProps {
  exercise: Exercise;
  sets: ExerciseSet[];
}

const ExerciseSetsItem: React.FC<ExerciseSetsItemProps> = ({
  exercise,
  sets,
}) => {
  const getTrackingMetrics = (exercise: Exercise): string[] => {
    const metrics = metricToNiceString(exercise.trackingMetric);
    return metrics.split("/");
  };

  return (
    <Pressable>
      <View style={styles.container}>
        <CustomText weight={theme.FontWeights.bold} style={styles.title}>
          {exercise.name}
        </CustomText>
        <View style={styles.metricContainer}>
          {getTrackingMetrics(exercise).map((metric, metricIndex) => {
            return (
              <View style={styles.metricColumn} key={metricIndex}>
                <CustomText>{metric}</CustomText>
                {sets
                  .filter((set) => set.exerciseId === exercise.id)
                  .map((set, index) => {
                    return (
                      <CustomText key={index}>
                        {metricIndex === 0
                          ? set.metricValueOne
                          : set.metricValueTwo}
                      </CustomText>
                    );
                  })}
              </View>
            );
          })}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: theme.FontSizes.large,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.Colors.background,
  },
  metricContainer: {
    backgroundColor: theme.Colors.background_100,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  metricColumn: {
    alignItems: 'center',
    gap: theme.Spacing.sm,
  }
});

export default ExerciseSetsItem;
