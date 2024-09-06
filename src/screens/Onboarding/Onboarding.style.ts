import { StyleSheet, Dimensions } from "react-native";

const screenHeight = Dimensions.get("window").height;

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emailButton: {
    marginBottom: screenHeight * 0.02,
    marginTop: screenHeight * 0.05,
  },
  nostrButton: {
    marginBottom: screenHeight * 0.05,
  },
});
