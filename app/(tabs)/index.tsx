import { router } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Text style={styles.calendarText}>Calendar</Text>
      </View>
      <View style={styles.listContainer}>
        <FlatList showsVerticalScrollIndicator={false} data={dummyData} renderItem={({ item }) => <WorkoutItem title={item.title} id={item.id}  />} />
      </View>
    </View>
  );
}

type ItemProps = { title: string, id:number };

const dummyData: ItemProps[] = Array.from({ length: 1000 }, (_, i) => ({
  title: `Item ${i}`, id: i,
}));

const WorkoutItem = (item: ItemProps) => (
  <Pressable onPress={() =>
          router.navigate({
            pathname: '/workouts/[workout]',
            params: { workout: item.id }
          })
        }>
    <View style={styles.workoutItem}>
      <Text style={styles.homeText}>{item.title}</Text>
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
    height: 50,
    width: 200,

  }
});
