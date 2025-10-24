import { Image } from 'expo-image';
import { router } from 'expo-router';
import { FlatList, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import AddItemModal from '../components/AddItemModal';
import ScreenWrapper from '../components/ScreenWrapper';
import WorkoutListItem from '../components/WorkoutListItem';
import { addWorkout, Workout, WorkoutShell } from '../db/database';
import { useAddLocation } from '../hooks/useAddStore';
import { useWorkouts } from '../hooks/useWorkouts';
import { theme } from '../styling/stylingStandards';
import { getCurrentTimestamp } from '../util/time';

export default function Index() {
  const { allWorkouts, addWorkoutToList } = useWorkouts()

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

  const image = require('../../assets/images/thedon.jpg');

  return (
    <ScreenWrapper style={styles.container}>
      <View style={styles.calendarContainer}>
        <Image source={image} contentFit='cover' style={styles.calendarContainer} />
      </View>
      <View style={styles.listContainer}>
        <FlatList showsVerticalScrollIndicator={false} data={allWorkouts} renderItem={({ item }) => <WorkoutListItem workout={item} />} style={styles.list}
          ItemSeparatorComponent={() => <View style={{ height: theme.Spacing.xs }} />} />
      </View>
      <AddItemModal visible={plusLocation === localLocation} onClose={resetAddLocation} onAdd={addWorkout} onAddToList={addWorkoutToList} createShell={createWorkoutShell} />
    </ScreenWrapper>
  );
}

const WorkoutItem = ({ workout }: { workout: Workout }) => (
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
    borderRadius: 8,
  },
  homeText: {
    color: '#fff',
    fontSize: 18,
  },
  list: {
    width: '100%',
  },
  workoutItem: {
    backgroundColor: '#1abf',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 5
  }
});
