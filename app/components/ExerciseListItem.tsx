import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { Exercise, MetricToNiceString } from '../db/database';
import { theme } from '../styling/stylingStandards';
import CustomText from './CustomText';

interface ExerciseListItemProps {
    exercise: Exercise;
    onDelete: (exercise: Exercise) => void;
}


const ExerciseListItemComponent: React.FC<ExerciseListItemProps> = ({ exercise, onDelete }) => {
    const [showModal, setShowModal] = useState(false);

    const handleConfirmDelete = () => {
        setShowModal(false);
        onDelete(exercise);
    };

    return (
        <>
            <Pressable
                onLongPress={() => setShowModal(true)}
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

            <Modal
                visible={showModal}
                transparent
                animationType="fade"
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <CustomText
                            weight={theme.FontWeights.bold}
                            size={theme.FontSizes.xl}
                            color={theme.Colors.text}
                            style={{ marginBottom: theme.Spacing.md, textAlign: 'center' }}
                        >
                            Delete Exercise?
                        </CustomText>

                        <CustomText
                            weight={theme.FontWeights.regular}
                            size={theme.FontSizes.medium}
                            color={theme.Colors.text_800}
                            style={{ marginBottom: theme.Spacing.lg, textAlign: 'center' }}
                        >
                            Are you sure you want to delete {exercise.name}?
                        </CustomText>

                        <View style={styles.modalButtons}>
                            <Pressable
                                style={[styles.button, styles.cancelButton]}
                                onPress={() => setShowModal(false)}
                            >
                                <CustomText
                                    weight={theme.FontWeights.medium}
                                    size={theme.FontSizes.medium}
                                    color={theme.Colors.text}
                                >
                                    Cancel
                                </CustomText>
                            </Pressable>

                            <Pressable
                                style={[styles.button, styles.deleteButton]}
                                onPress={handleConfirmDelete}
                            >
                                <CustomText
                                    weight={theme.FontWeights.medium}
                                    size={theme.FontSizes.medium}
                                    color={theme.Colors.background}
                                >
                                    Delete
                                </CustomText>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};

const ExerciseListItem = React.memo(
    ExerciseListItemComponent,
    (prevProps, nextProps) => prevProps.exercise.id === nextProps.exercise.id
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.Colors.background_100,
        borderRadius: theme.Radius.md,
        padding: theme.Spacing.md,
        marginBottom: theme.Spacing.sm,
        width: '100%',
        borderWidth: 1,
    },
    inner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        paddingVertical: theme.Spacing.sm,
        borderRadius: theme.Radius.sm,
        alignItems: 'center',
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: theme.Colors.background,
    borderRadius: theme.Radius.md,
    padding: theme.Spacing.lg,
    width: '80%',
    borderWidth: 1,
    borderColor: theme.Colors.background_800,
  },
});

export default ExerciseListItem;