import { StyleSheet } from "react-native";
import CustomText from "../components/CustomText";
import ScreenWrapper from "../components/ScreenWrapper";

export default function SettingsScreen() {
  return (
    <ScreenWrapper style={styles.container}>
      <CustomText style={styles.text}>Settings</CustomText>
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
