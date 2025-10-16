import Ionicons from "@expo/vector-icons/Ionicons";
import { Alert, Pressable, StyleSheet } from "react-native"

export default function DummyScreen() {
    return <></>
}

export const PlusButton = () => {
    const onPress = () => {
        console.log('PRESS');
        Alert.alert('You Pressed Le Big +');
    };
    
    return <Pressable onPress={onPress} style={styles.button}>

        <Ionicons name="add-circle-outline" size={48} color="#000" />
    </Pressable>
};

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: 20, // adjust based on your tab bar height
        alignSelf: 'center',

        borderRadius: 100,

        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 50,

        backgroundColor: '#fff',
        elevation: 5, // adds shadow on Android
        shadowColor: '#000', // shadow on iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
    },
});