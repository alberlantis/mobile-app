import { StyleSheet, Dimensions } from "react-native";

const screenHeight = Dimensions.get("window").height;

export default StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    height: screenHeight * 0.06,
  },
});
