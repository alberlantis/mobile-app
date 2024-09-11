import {
  ColorValue,
  StyleProp,
  StyleSheet,
  ViewStyle,
  Dimensions,
  TextStyle,
} from "react-native";

import fonts from "src/theme/fonts";

const heightScreen = Dimensions.get("window").height;
const labelSize = heightScreen * 0.05;

export const getLine = (
  height: number,
  backgroundColor: ColorValue,
): StyleProp<ViewStyle> => ({
  width: "100%",
  position: "absolute",
  height,
  backgroundColor,
});
export const getLabel = (labelColor: ColorValue): StyleProp<ViewStyle> => ({
  justifyContent: "center",
  alignItems: "center",
  borderRadius: labelSize / 2,
  backgroundColor: labelColor,
  width: labelSize,
  height: labelSize,
});
export const getLabelText = (textColor: ColorValue): StyleProp<TextStyle> => ({
  color: textColor,
  fontSize: fonts[14],
});

export default StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
