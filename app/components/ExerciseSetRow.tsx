import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { theme } from "../styling/stylingStandards";
import { ExerciseSet } from "../util/dataTypes";
import CustomText from "./CustomText";
import CustomTextInput from "./CustomTextInput";

interface ExerciseSetRowProps {
  set: ExerciseSet;
  metricLabels: string[];
  metricUnits: string[];
  onChange: (id: number, metric: 1 | 2, value: number) => void;
  onFocusExercise: () => void;
}

const ExerciseSetRow: React.FC<ExerciseSetRowProps> = ({
  set,
  metricLabels,
  metricUnits,
  onChange,
  onFocusExercise,
}) => {
  const [localOne, setLocalOne] = useState(
    set.metricValueOne?.toString() ?? ""
  );
  const [localTwo, setLocalTwo] = useState(
    set.metricValueTwo?.toString() ?? ""
  );
  const dirtyRef = useRef({ one: false, two: false });

  const handleChange = (metric: 1 | 2, value: string) => {
    if (metric === 1) {
      dirtyRef.current.one = true;
      setLocalOne(value);
    } else {
      dirtyRef.current.two = true;
      setLocalTwo(value);
    }
  };

  const handleBlur = () => {
    if (dirtyRef.current.one) {
      onChange(set.id, 1, Number(localOne) || 0);
    }
    if (dirtyRef.current.two) {
      onChange(set.id, 2, Number(localTwo) || 0);
    }
    dirtyRef.current = { one: false, two: false };
  };

  return (
    <View style={styles.row}>
      <View style={styles.metricColumn}>
        <View style={styles.inputContainer}>
          <CustomTextInput
            value={localOne}
            onChangeText={(value) => handleChange(1, value)}
            onFocus={onFocusExercise}
            onBlur={handleBlur}
            keyboardType="numeric"
            style={styles.input}
            size={theme.FontSizes.medium}
            color={theme.Colors.text}
            weight={theme.FontWeights.medium}
          />
          {metricUnits.length > 0 && <CustomText>{metricUnits[0]}</CustomText>}
        </View>
      </View>
      {metricLabels.length != 1 && (
        <View style={styles.inputContainer}>
          <CustomTextInput
            value={localTwo}
            onChangeText={(value) => handleChange(2, value)}
            onFocus={onFocusExercise}
            onBlur={handleBlur}
            keyboardType="numeric"
            style={styles.input}
            size={theme.FontSizes.medium}
            color={theme.Colors.text}
            weight={theme.FontWeights.medium}
          />
          {metricUnits.length == 2 && <CustomText>{metricUnits[1]}</CustomText>}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: theme.Spacing.xs,
  },
  metricColumn: {
    alignItems: "center",
    gap: theme.Spacing.xs,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  input: {
    width: 60,
    textAlign: "center",
    backgroundColor: theme.Colors.background_100,
    borderWidth: 1,
    borderColor: theme.Colors.background_800,
    borderRadius: theme.Radius.sm,
    paddingVertical: theme.Spacing.xs,
    paddingHorizontal: theme.Spacing.xs,
  },
});

export default React.memo(ExerciseSetRow);
