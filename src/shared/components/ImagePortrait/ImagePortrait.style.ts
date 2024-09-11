import { StyleSheet, Dimensions } from "react-native";

const { height: screenHeight } = Dimensions.get("window");
export const imageHeight = screenHeight * 0.2;

export default StyleSheet.create({
  image: {
    width: "100%",
    height: imageHeight,
  },
});
