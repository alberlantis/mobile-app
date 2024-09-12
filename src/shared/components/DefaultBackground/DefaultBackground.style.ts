import { StyleSheet } from "react-native";

import colors from "src/theme/colors";

export const background = StyleSheet.compose(StyleSheet.absoluteFill, {
  backgroundColor: colors.BLACK,
});
export const svgBackground = StyleSheet.compose(StyleSheet.absoluteFill, {
  opacity: 0.1,
});
