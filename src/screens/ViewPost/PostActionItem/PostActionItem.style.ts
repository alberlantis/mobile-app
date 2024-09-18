import { StyleSheet } from "react-native";

import { colors, normalizeSize, fonts } from "src/theme";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.GRAY_BOLD,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: normalizeSize(8),
    paddingVertical: normalizeSize(4),
    borderRadius: normalizeSize(19),
  },
  text: {
    color: colors.WHITE_BOLD,
    fontSize: normalizeSize(12),
    fontWeight: fonts.medium,
    marginLeft: normalizeSize(6),
  },
});
