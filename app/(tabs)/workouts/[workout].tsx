import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Workout() {
    const { workout } = useLocalSearchParams();

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>User ID: {workout}</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#afbe',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#000',
    },
});

