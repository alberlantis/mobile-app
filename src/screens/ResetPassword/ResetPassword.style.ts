import { StyleSheet, Dimensions } from "react-native";

const { height: screenHeight } = Dimensions.get("window");
const screenMarginSeparator = screenHeight * 0.04;

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: "2%",
  },
  input: {
    marginTop: screenMarginSeparator,
  },
  button: {
    marginTop: screenMarginSeparator,
  },
});
