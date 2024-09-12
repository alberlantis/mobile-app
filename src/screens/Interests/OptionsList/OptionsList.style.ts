import { StyleSheet, StyleProp, ViewStyle } from "react-native";

import { normalizeSize } from "src/theme";

export const getRowContainer = (
  isSecondRow: boolean,
): StyleProp<ViewStyle> => ({
  flexDirection: "row",
  paddingLeft: isSecondRow ? normalizeSize(120) / 2 : 0,
});
export default StyleSheet.create({
  listContainer: {
    width: "100%",
    justifyContent: "center",
  },
});
