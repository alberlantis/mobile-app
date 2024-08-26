import { StyleSheet } from "react-native";

import colors from "src/theme/colors";

const styles = StyleSheet.create({
  svgContainer: {
    opacity: 0.1,
  },
  background: {
    backgroundColor: colors.BLACK,
  },
});

export const background = StyleSheet.compose(
  StyleSheet.absoluteFill,
  styles.background,
);
export const svgBackground = StyleSheet.compose(
  StyleSheet.absoluteFill,
  styles.svgContainer,
);
