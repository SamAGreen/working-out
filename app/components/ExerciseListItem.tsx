import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { theme } from "../styling/stylingStandards";
import CustomText from "./CustomText";
import DeleteItemModal from "./DeleteItemModal";
import { Exercise, MetricToNiceString } from "../util/dataTypes";

interface ExerciseListItemProps {
  exercise: Exercise;
  onDelete: (exercise: Exercise) => void;
}

const ExerciseListItemComponent: React.FC<ExerciseListItemProps> = ({
  exercise,
  onDelete,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    onDelete(exercise);
  };

  return (
    <>
      <Pressable
        onLongPress={() => setShowDeleteModal(true)}
        style={({ pressed }) => [
          styles.container,
          pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] },
        ]}
      >
        <View style={styles.inner}>
          <CustomText
            weight={theme.FontWeights.bold}
            size={theme.FontSizes.large}
            color={theme.Colors.text}
          >
            {exercise.name}
          </CustomText>
          <CustomText
            weight={theme.FontWeights.regular}
            size={theme.FontSizes.small}
            color={theme.Colors.text_800}
          >
            {MetricToNiceString(exercise.trackingMetric)}
          </CustomText>
        </View>
      </Pressable>

      <DeleteItemModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        itemName={exercise.name}
        itemType={"Exercise"}
        handleDelete={handleConfirmDelete}
      />
    </>
  );
};

const ExerciseListItem = React.memo(
  ExerciseListItemComponent,
  (prevProps, nextProps) => prevProps.exercise.id === nextProps.exercise.id,
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.Colors.background_100,
    borderRadius: theme.Radius.md,
    padding: theme.Spacing.md,
    marginBottom: theme.Spacing.sm,
    width: "100%",
    borderWidth: 1,
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    paddingVertical: theme.Spacing.sm,
    borderRadius: theme.Radius.sm,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: theme.Colors.background_100,
    marginRight: theme.Spacing.sm,
  },
  deleteButton: {
    backgroundColor: theme.Colors.error,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: theme.Colors.background,
    borderRadius: theme.Radius.md,
    padding: theme.Spacing.lg,
    width: "80%",
    borderWidth: 1,
    borderColor: theme.Colors.background_800,
  },
});

export default ExerciseListItem;
