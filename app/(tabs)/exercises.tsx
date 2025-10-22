import React from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddItemModal from '../components/AddItemModal';
import { addExercise, deleteExercise, Exercise, ExerciseShell } from '../db/database';
import { useAddLocation } from '../hooks/useAddStore';
import { useExercises } from '../hooks/useExercises';

export default function ExercisesScreen() {
  const { filteredExercises, searchValue, handleSearch, addExerciseToList, removeExerciseFromList } = useExercises();

  const plusLocation = useAddLocation((state) => state.plusLocation);
  const resetAddLocation = useAddLocation((state) => state.resetAddLocation);
  const localLocation = 'exercises';

  const handleDelete = (exercise: Exercise) => {
    deleteExercise(exercise.id).then((success) => {
      if (success) {
        removeExerciseFromList(exercise);
        Alert.alert(exercise.name + ' DELETED');
      } else {
        console.log("Something went wrong handling delete");
      }
    })
  }

  const createExerciseShell = (name: string): ExerciseShell => {
    return {name: name};
  }

  const Item = ({ exercise }: { exercise: Exercise }) => (
    <Pressable onLongPress={() => handleDelete(exercise)}>
      <View style={styles.item}>
        <Text style={styles.itemText}>{exercise.name}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Search here..."
        value={searchValue}
        onChangeText={handleSearch}
        style={styles.input}
      />
      <FlatList
        data={filteredExercises}
        renderItem={({ item }) => <Item exercise={item} />}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />
      <AddItemModal visible={plusLocation === localLocation} onClose={resetAddLocation} onAdd={addExercise} onAddToList={addExerciseToList} createShell={createExerciseShell} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%"
  },
  text: {
    color: '#fff',
  },
  item: {
    backgroundColor: "#1afb", // Background color for each item
    width: 200,
    height: 50,
    alignContent: 'center'
  },
  itemText: {
    color: "black",
    fontSize: 18,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  list: {
    width: "100%",
    display: 'flex',
  },
  button: {
    backgroundColor: '#000',
    width: 50,
    height: 20,
    color: '#fff'
  }
});