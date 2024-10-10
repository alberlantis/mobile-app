import { StyleSheet } from "react-native";

import { colors, fonts, normalizeSize } from "src/theme";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: normalizeSize(18),
    borderBottomWidth: normalizeSize(1),
    borderBottomColor: colors.BLACK_6,
  },
  label: {
    color: colors.WHITE,
    fontSize: normalizeSize(14),
    fontWeight: fonts.medium,
  },
  iconContainer: {
    width: normalizeSize(24),
    height: normalizeSize(24),
    borderRadius: normalizeSize(24) / 2,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: normalizeSize(1),
  },
});
