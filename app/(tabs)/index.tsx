import { router } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWorkouts } from '../hooks/useWorkouts';
import { Workout } from '../db/database';

export default function Index() {
  const {allWorkouts} = useWorkouts()
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.calendarContainer}>
        <Text style={styles.calendarText}>Calendar</Text>
      </View>
      <View style={styles.listContainer}>
        <FlatList showsVerticalScrollIndicator={false} data={allWorkouts} renderItem={({ item }) => <WorkoutItem workout={item}  />} />
      </View>
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
