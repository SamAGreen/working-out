import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function Workout() {
    const { workout } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>User ID: {workout}</Text>
        </View>
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

