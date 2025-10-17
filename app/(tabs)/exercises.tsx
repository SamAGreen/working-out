import React from 'react';
import { Text, View, StyleSheet, FlatList, TextInput } from 'react-native';
import { SearchBar } from 'react-native-elements';

export default function ExercisesScreen() {
  return (
    <Search />
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

type ItemProps = {title: string, id: string};

const Item = ({title}: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.itemText}>{title}</Text>
  </View>
);

export const Search = () => {
  const [data, setData] = React.useState<ItemProps[]>(DATA);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const arrayholder = React.useRef<ItemProps[]>(DATA); 

  const searchFunction = (text: string): void => {
    const updatedData = arrayholder.current.filter((item) => {
      const itemData = item.title.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.includes(textData);
    });

    setData(updatedData);
    setSearchValue(text);
  };

  return (
    <View style={styles.container}> {/* Main container style */}
      {/* SearchBar component for user input */}
      <TextInput
        placeholder="Search here..."
        value={searchValue}
        onChangeText={searchFunction}
        style={styles.input}
      />
      <FlatList
        data={data} // Data to display in the list
        renderItem={({ item }) => <Item title={item.title} id={item.id} />} // Render each item using the Item component
        keyExtractor={(item) => item.id} // Unique key for each item
        style={styles.list}
      />
    </View>
  );
};


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