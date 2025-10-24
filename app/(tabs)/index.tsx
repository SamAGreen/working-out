import { router } from 'expo-router';
import { FlatList, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWorkouts } from '../hooks/useWorkouts';
import { addWorkout, Workout, WorkoutShell } from '../db/database';
import AddItemModal from '../components/AddItemModal';
import { useAddLocation } from '../hooks/useAddStore';
import { getCurrentTimestamp } from '../util/time';
import { Image } from 'expo-image';

export default function Index() {
  const {allWorkouts, addWorkoutToList} = useWorkouts()

  const localLocation = 'home';
  const plusLocation = useAddLocation((state) => state.plusLocation);
  const resetAddLocation = useAddLocation((state) => state.resetAddLocation);

  const createWorkoutShell = (name: string): WorkoutShell => {
    return {
    name: name,
    date: getCurrentTimestamp(),
   duration: null
}
  }

  const image = require('@/assets/images/thedon.jpg');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.calendarContainer}>
        <Image source={image}/>
      </View>
      <View style={styles.listContainer}>
        <FlatList showsVerticalScrollIndicator={false} data={allWorkouts} renderItem={({ item }) => <WorkoutItem workout={item}  />} />
      </View>
      <AddItemModal visible={plusLocation===localLocation} onClose={resetAddLocation} onAdd={addWorkout} onAddToList={addWorkoutToList} createShell={createWorkoutShell} />
    </SafeAreaView>
  );
}

const WorkoutItem = ({workout}: {workout: Workout}) => (
  <Pressable onPress={() =>
          router.navigate({
            pathname: '/workouts/[workout]',
            params: { workout: workout.id }
          })
        }>
    <View style={styles.workoutItem}>
      <Text style={styles.homeText}>{'Workout ID: ' + workout.id}</Text>
      <Text style={styles.homeText}>{'Workout Name: ' + workout.name}</Text>
      <Text style={styles.homeText}>{'Workout Date: ' + workout.date}</Text>
      <Text style={styles.homeText}>{'Workout Duration: ' + workout.duration}</Text>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12
  },
  calendarContainer: {
    width: '100%',
    flex: 2,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  calendarText: {
    fontFamily: Platform.select({
      android: 'Orbitron_700Bold',
      ios: 'Orbitron',
    }),
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
  listContainer: {
    width: '100%',
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2f3a',
    borderRadius: 8,
  },
  homeText: {
    color: '#fff',
    fontSize: 18,
  },
  workoutItem: {
    backgroundColor: '#1abf',
    height: 150,
    width: 350,
    borderStyle: 'solid',
    borderWidth: 5
  }
});
