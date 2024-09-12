import {
  ColorValue,
  StyleProp,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";

import { normalizeSize, fonts } from "src/theme";

export const getLine = (
  span: number,
  backgroundColor: ColorValue,
): StyleProp<ViewStyle> => ({
  width: "100%",
  position: "absolute",
  height: normalizeSize(span),
  backgroundColor,
});
export const getLabel = (labelColor: ColorValue): StyleProp<ViewStyle> => ({
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: labelColor,
  width: normalizeSize(40),
  height: normalizeSize(20),
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
  label: {
    justifyContent: "center",
    alignItems: "center",
    width: normalizeSize(40),
    height: normalizeSize(20),
  },
});
