import { useNavigationState } from "@react-navigation/native";
import React from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useAddLocation } from "../hooks/useAddStore";

export default function DummyScreen() {
  return <></>;
}

export const PlusButton = () => {
  const currentRouteName = useNavigationState(
    (state) => state.routes[state.index].name,
  );

  const setAddLocation = useAddLocation((state) => state.setAddLocation);
  const resetAddLocation = useAddLocation((state) => state.resetAddLocation);
  const plusActive = useAddLocation((state) => state.plusActive);

  const plusIconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: withTiming(plusActive ? "45deg" : "0deg") }],
  }));

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  const handlePress = () => {
    if (plusActive) {
      resetAddLocation();
    } else {
      if (currentRouteName === "index") setAddLocation("home");
      else if (currentRouteName === "planning")
        Alert.alert("Planning tab + pressed");
      else if (currentRouteName === "exercises") setAddLocation("exercises");
      else if (currentRouteName === "workouts/[workout]")
        Alert.alert("Workout + pressed");
    }
  };

  return (
    <AnimatedPressable onPress={handlePress} style={styles.button}>
      <Animated.View style={[plusIconStyle, styles.plus]}>
        <View style={[styles.line, styles.horizontal]} />
        <View style={[styles.line, styles.vertical]} />
      </Animated.View>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 50,
    backgroundColor: "#fff",
  },
  plus: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    position: "absolute",
    backgroundColor: "#000",
  },
  horizontal: {
    width: 24,
    height: 3,
  },
  vertical: {
    width: 3,
    height: 24,
  },
});
