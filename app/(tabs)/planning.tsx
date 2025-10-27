import { StyleSheet } from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import CustomText from "../components/CustomText";

export default function PlanningScreen() {
  return (
    <ScreenWrapper style={styles.container}>
      <CustomText style={styles.text}>Planning</CustomText>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
});
