import { StyleSheet } from "react-native";

import { colors, fonts, normalizeSize } from "src/theme";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  square: {
    width: normalizeSize(20),
    height: normalizeSize(20),
    borderRadius: normalizeSize(4),
    justifyContent: "center",
    alignItems: "center",
    marginRight: normalizeSize(12),
    borderColor: colors.GRAY_MEDIUM,
  },
  label: {
    fontSize: fonts[14],
    color: colors.WHITE,
    fontWeight: "medium",
  },
});
