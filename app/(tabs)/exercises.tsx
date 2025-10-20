import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList, TextInput, Modal, Pressable } from 'react-native';
import { useExercises } from '../hooks/useExercises';
import { useAddLocation } from '../hooks/useAddStore';
import { addExercise } from '../db/database';

type ItemProps = { title: string, id: number };

export default function ExercisesScreen() {

  const { filteredExercises, searchValue, handleSearch, addExerciseToList } = useExercises();
  const [exerciseName, setExerciseName] = useState('');

  const resetAddLocation = useAddLocation((state) => state.resetAddLocation);
  const plusLocation = useAddLocation((state) => state.plusLocation);

  const handleAdd = () => {
    if (exerciseName.trim() === '') return;

    const name = exerciseName.trim();

    addExercise(name)
      .then((id) => {
        if(id > 0) {
          addExerciseToList({ id, name });
        } 
      }).catch((error) => {
        console.log("Joa, dann weiß ich auch nicht mehr");
      });

    setExerciseName('');
    resetAddLocation();
  };




  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search here..."
        value={searchValue}
        onChangeText={handleSearch}
        style={styles.input}
      />
      <FlatList
        data={filteredExercises} // Data to display in the list
        renderItem={({ item }) => <Item title={item.name} id={item.id} />} // Render each item using the Item component
        keyExtractor={(item) => item.id.toString()} // Unique key for each item
        style={styles.list}
      />
      <Modal
        transparent={true}
        visible={plusLocation === 'exercises'}
        onRequestClose={resetAddLocation}
        onDismiss={resetAddLocation}
      >
        <View style={styles.modal}>
          <Text style={styles.modalText}>THIS IS A MODAL</Text>
          <TextInput
            style={styles.input}
            placeholder='Add Exercise...'
            value={exerciseName}
            onChangeText={setExerciseName}
          />
          <Pressable
            style={styles.button}
            onPress={resetAddLocation}
          >
            <Text style={styles.text}>Close</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={handleAdd}
          >
            <Text style={styles.text}>Add Exercise</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
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
  modal: {
    width: 200,
    height: 200,
    backgroundColor: '#f2ab',
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalText: {
    fontSize: 30,
    color: '#cf2a'
  },
  button: {
    backgroundColor: '#000',
    width: 50,
    height: 20,
    color: '#fff'
  }
});



const Item = ({ title }: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.itemText}>{title}</Text>
  </View>
);