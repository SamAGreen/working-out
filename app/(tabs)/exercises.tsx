import React from 'react';
import { Text, View, StyleSheet, FlatList, TextInput } from 'react-native';
import { useExercises } from '../hooks/exercises';

type ItemProps = {title: string, id: number};

export default function ExercisesScreen() {

  const {filteredExercises , searchValue, handleSearch, allExercises} = useExercises();

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
    color: "black", // Text color
    fontSize: 18, // Font size for the text
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
  }
});



const Item = ({title}: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.itemText}>{title}</Text>
  </View>
);



const DATA = [
  { id: "1", title: "Back Squat" },
  { id: "2", title: "Benchpress" },
  { id: "3", title: "Deadlift"},
  { id: "4", title: "Overhead Press" },
  { id: "5", title: "Front Squat" },
  { id: "6", title: "Bicep Curl" },
  { id: "7", title: "Lateral Raise" },
  { id: "8", title: "Leg Extension" },
  { id: "9", title: "Calf Raise" },
  { id: "10", title: "Leg Raise" },
  { id: "11", title: "Lying Leg Raise" },
  { id: "12", title: "Bulgarian Split Squat" },
];