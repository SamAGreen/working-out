import { Modal, Pressable, TextInput, View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { useAddLocation } from "@/app/hooks/useAddStore";
import { Exercise } from "@/app/db/database";

interface AddExerciseModalProps {
  addExercise: (exerciseName: string) => Promise<any>;
  addExerciseToList: (exercise: Exercise) => void;
}

export default function AddExerciseModal({ addExercise, addExerciseToList }: AddExerciseModalProps) {
  const plusLocation = useAddLocation((state) => state.plusLocation);
  const resetAddLocation = useAddLocation((state) => state.resetAddLocation);

  const [exerciseName, setExerciseName] = useState('');

  const handleAdd = () => {
    if (exerciseName.trim() === '') return;

    const name = exerciseName.trim();

    addExercise(name)
      .then((id) => {
        if (id > 0) {
          addExerciseToList({ id, name });
        }
      })
      .catch((error) => {
        console.log("Error adding exercise", error);
      });

    setExerciseName('');
    resetAddLocation();
  };

  return (
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
        <Pressable style={styles.button} onPress={resetAddLocation}>
          <Text style={styles.text}>Close</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleAdd}>
          <Text style={styles.text}>Add Exercise</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    width: 200,
    height: 200,
    backgroundColor: '#f2ab',
    top: "50%",
    left: "50%",
    transform: [{ translateX: -100 }, { translateY: -100 }],
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    fontSize: 30,
    color: '#cf2a'
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#000',
    width: 100,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  text: {
    color: '#fff',
  }
});
