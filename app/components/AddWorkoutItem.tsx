import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { theme } from "../styling/stylingStandards";
import { WorkoutShell } from "../util/dataTypes";
import CustomText from "./CustomText";
import CustomTextInput from "./CustomTextInput";

interface AddWorkoutItemProps {
  handleAdd: (workout: WorkoutShell) => Promise<void>;
}

const AddWorkoutItem = ({ handleAdd }: AddWorkoutItemProps) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const createWorkoutShell = (): WorkoutShell => {
    const numbers = date.split("/");
    return {
      name: name,
      date: new Date(+numbers[2], +numbers[1] - 1, +numbers[0]).toISOString(),
      duration: null,
      finished: 0,
    };
  };

  const handleDateChange = (text: string) => {
    const cleaned = text.replace(/\D/g, "");

    let formatted = cleaned;

    if (cleaned.length >= 3 && cleaned.length <= 4) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    } else if (cleaned.length >= 5 && cleaned.length <= 8) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4)}`;
    }

    setDate(formatted);
  };

  return (
    <View style={styles.newItemContainer}>
      <View style={styles.inputContainer}>
        <CustomTextInput
          placeholder="New exercise name..."
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
      </View>

      <View style={styles.row}>
        <View style={styles.dateInputContainer}>
          <CustomTextInput
            style={styles.dateInput}
            value={date}
            onChangeText={handleDateChange}
            placeholder="DD/MM/YYYY"
            keyboardType="number-pad"
            maxLength={10}
          />
        </View>
        <Pressable
          style={styles.addButton}
          onPress={() => handleAdd(createWorkoutShell())}
        >
          <CustomText
            weight={theme.FontWeights.bold}
            size={theme.FontSizes.large}
            color={theme.Colors.background}
          >
            Add
          </CustomText>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  newItemContainer: {
    backgroundColor: theme.Colors.primary_100,
    borderRadius: theme.Radius.md,
    padding: theme.Spacing.md,
    marginBottom: theme.Spacing.sm,
    borderWidth: 1,
    borderColor: theme.Colors.accent_100,
    width: "100%",
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    paddingHorizontal: theme.Spacing.sm,
    paddingVertical: theme.Spacing.xs,
    fontSize: theme.FontSizes.large,
    marginBottom: theme.Spacing.sm,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  dateInputContainer: {
    flex: 7,
    marginRight: theme.Spacing.sm,
  },
  dateInput: {
    backgroundColor: theme.Colors.background,
    borderRadius: theme.Radius.md,
    paddingHorizontal: theme.Spacing.sm,
    paddingVertical: 12,
    fontSize: theme.FontSizes.medium,
    textAlignVertical: "center",
    borderWidth: 1,
    borderColor: theme.Colors.background_800,
  },
  addButton: {
    flex: 3, 
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.Colors.primary,
    borderRadius: theme.Radius.md,
    height: 48, 
  },
});

export default AddWorkoutItem;
