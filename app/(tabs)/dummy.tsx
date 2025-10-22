import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { Alert, Pressable, StyleSheet } from "react-native";
import { useAddLocation } from "../hooks/useAddStore";

export default function DummyScreen() {
  return <></>
}

export const PlusButton = () => {

  const navigation = useNavigation();

  // Access the index of the active tab
  const currentTabIndex = useNavigationState((state) => state.index);

  // Access the route name of the active tab
  const currentRouteName = useNavigationState((state) => state.routes[state.index].name);

  const setAddLocation = useAddLocation((state) => state.setAddLocation);

  const onPress = () => {
    console.log('Button Pressed');
    if (currentRouteName === 'index') {

      setAddLocation('home');

    } else if (currentRouteName === 'planning') {
      Alert.alert('You pressed + on the planning tab');
    } else if (currentRouteName === 'exercises') {
      setAddLocation('exercises');
    } else if (currentRouteName === 'workouts/[workout]') {
      Alert.alert('YOU PRESSED + on a workout!');
    } else {

    }
  };

  return <Pressable onPress={onPress} style={styles.button}>
    <Ionicons name="add-circle-outline" size={48} color="#000" />
  </Pressable>
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    backgroundColor: '#fff',
  },
});