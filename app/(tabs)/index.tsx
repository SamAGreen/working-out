import { View, Text, StyleSheet, FlatList } from 'react-native';

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Text style={styles.calendarText}>Calendar</Text>
      </View>
      <View style={styles.listContainer}>
        <FlatList showsVerticalScrollIndicator={false} data={dummyData} renderItem={({item}) => <WorkoutItem title={item.title}/>}/>
      </View>
    </View>
  );
}

type ItemProps = {title: string};

const dummyData: ItemProps[] = Array.from({ length: 1000 }, (_, i) => ({
  title: `Item ${i + 1}`,
}));

const WorkoutItem = ({title}: ItemProps) => (
  <View style={styles.workoutItem}>
    <Text style={styles.homeText}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap:12
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
