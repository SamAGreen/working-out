import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Exercise } from '../db/database';
import { theme } from '../styling/stylingStandards';
import CustomText from './CustomText';

interface ExerciseListItemProps {
    exercise: Exercise;
    onDelete: (exercise: Exercise) => void;
}

const ExerciseListItem: React.FC<ExerciseListItemProps> = ({ exercise, onDelete }) => {
    return (
        <Pressable
            onLongPress={() => onDelete(exercise)}
            style={({ pressed }) => [
                styles.container,
                pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] },
            ]}
        >
            <View style={styles.inner}>
                <CustomText
                    weight={theme.FontWeights.bold}
                    size={theme.FontSizes.medium}
                    color={theme.Colors.text}
                >
                    {exercise.name}
                </CustomText>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.Colors.background_100,
        borderRadius: theme.Radius.md,
        padding: theme.Spacing.md,
        marginBottom: theme.Spacing.sm,
        width: '100%',
        borderWidth: 1
    },
    inner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});

export default ExerciseListItem;
