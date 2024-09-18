import { StyleSheet } from "react-native";

import { colors, normalizeSize } from "src/theme";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    backgroundColor: "transparent",
  },
  menu: {
    backgroundColor: colors.BLACK_4,
    borderColor: colors.BLACK_5,
    borderWidth: normalizeSize(1),
    borderRadius: normalizeSize(14),
    shadowRadius: normalizeSize(14),
    minWidth: normalizeSize(200),
    padding: normalizeSize(2),
  },
  menuItemContainer: {
    backgroundColor: colors.BLACK_4,
    borderColor: colors.BLACK_5,
    borderWidth: normalizeSize(2),
    borderRadius: normalizeSize(14),
    shadowRadius: normalizeSize(14),
    padding: normalizeSize(2),
  },
});
