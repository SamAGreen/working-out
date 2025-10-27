import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Workout } from "../db/workoutDb";
import { theme } from "../styling/stylingStandards";
import { formatDate } from "../util/time";
import CustomText from "./CustomText";
import DeleteItemModal from "./DeleteItemModal";

interface WorkoutListItemProps {
    workout: Workout;
    handleDelete: (workout: Workout) => void
}

const WorkoutListItem: React.FC<WorkoutListItemProps> = ({ workout, handleDelete }) => {
    const router = useRouter();

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleConfirmDelete = () => {
        setShowDeleteModal(false);
        handleDelete(workout);
    }

    return (
        <>
            <Pressable
                style={({ pressed }) => [styles.container, pressed && { opacity: 0.7 }, !workout.finished && { backgroundColor: theme.Colors.primary_100 }]}
                onPress={() =>
                    router.push({
                        pathname: "/workouts/[workout]",
                        params: { workout: workout.id },
                    })
                }
                onLongPress={() => setShowDeleteModal(true)}
            >
                <CustomText
                    size={theme.FontSizes.xxl}
                    weight={theme.FontWeights.bold}
                    color={theme.Colors.text}
                >
                    {workout.name}
                </CustomText>

                <View style={styles.details}>
                    <CustomText
                        size={theme.FontSizes.medium}
                        weight={theme.FontWeights.regular}
                        color={theme.Colors.text}
                    >
                        {formatDate(workout.date)}
                    </CustomText>
                    <CustomText
                        size={theme.FontSizes.medium}
                        weight={theme.FontWeights.regular}
                        color={theme.Colors.text}
                    >
                        {workout.duration ?? "-"}
                    </CustomText>
                </View>
            </Pressable>
            <DeleteItemModal showModal={showDeleteModal} setShowModal={setShowDeleteModal} itemName={workout.name} itemType={"Exercise"} handleDelete={handleConfirmDelete} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.Colors.background_100,
        padding: theme.Spacing.md,
        borderRadius: theme.Radius.md,
        marginBottom: theme.Spacing.sm,
        width: "100%",
        borderWidth: 1,
        borderColor: theme.Colors.background_800,
    },
    details: {
        marginTop: theme.Spacing.xs,
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

export default WorkoutListItem;
