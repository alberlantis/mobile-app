import { StyleSheet, Dimensions } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const imageSize = screenWidth * 0.2;

export default StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: imageSize,
    height: imageSize,
    marginBottom: screenHeight * 0.03,
  },
});
