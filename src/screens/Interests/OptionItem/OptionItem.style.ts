import { StyleSheet, TextStyle, StyleProp, ViewStyle } from "react-native";

import { fonts, colors, normalizeSize } from "src/theme";

export const getItemTextStyle = (
  isOptionSelected: boolean,
): StyleProp<TextStyle> => ({
  color: isOptionSelected ? colors.WHITE : colors.WHITE_BOLD,
  fontWeight: isOptionSelected ? "semibold" : "regular",
  fontSize: fonts[14],
  textAlign: "center",
});
export const getButtonContainer = (
  isOptionSelected: boolean,
  isColumnLast: boolean,
): StyleProp<ViewStyle> => ({
  borderColor: isOptionSelected ? colors.WHITE : colors.GRAY_2,
  width: normalizeSize(120),
  height: normalizeSize(120),
  borderRadius: normalizeSize(120) / 2,
  borderStyle: isOptionSelected ? "solid" : "dashed",
  marginRight: isColumnLast ? 0 : normalizeSize(8),
  borderWidth: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingVertical: normalizeSize(8),
  paddingHorizontal: normalizeSize(20),
});
export default StyleSheet.create({
  selectedIcon: {
    backgroundColor: colors.BLACK,
    position: "absolute",
    borderRadius: normalizeSize(20) / 2,
    alignItems: "center",
    justifyContent: "center",
    width: normalizeSize(20),
    height: normalizeSize(20),
    top: "10%",
    right: "5%",
  },
});
