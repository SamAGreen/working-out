import { useLocalSearchParams } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Workout() {
    const { workout } = useLocalSearchParams();

    const dummyData: ItemProps[] = Array.from({ length: 7 }, (_, i) => ({
        title: `Item ${i}`, id: i,
    }));

    type ItemProps = { title: string, id: number };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.text}>Workout ID: {workout}</Text>
            </View>
            <View style={styles.setsConatiner}>
                <FlatList style={styles.list} showsVerticalScrollIndicator={false} data={dummyData} renderItem={({ item }) =>
                    <View style={styles.listItem}>
                        <Text>Fart</Text>
                    </View>} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        alignContent: 'space-around'
    },
    text: {
        color: '#000',
    },
    titleContainer: {
        height: 60,
        backgroundColor: '#fabc',
        width: '95%'
    },
    setsConatiner: {
        flex: 1,
        backgroundColor: '#2dac',
        width: '95%',
        display: 'flex',
        alignItems: 'center',
    },
    listItem: {
        height: 150,
        width: 300,
        backgroundColor: '#abba'
    },
    list: {
    }
});

