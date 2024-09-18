import { StyleSheet } from "react-native";

import { colors, fonts, normalizeSize } from "src/theme";

export default StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: normalizeSize(12),
    backgroundColor: colors.BLACK_4_OPACITY_A,
  },
  menuText: {
    marginLeft: normalizeSize(8),
    fontSize: normalizeSize(14),
    color: colors.WHITE,
    fontWeight: fonts.medium,
  },
  borderItem: {
    borderBottomColor: colors.BLACK_4,
    borderBottomWidth: normalizeSize(1),
  },
  firstItem: {
    borderTopLeftRadius: normalizeSize(14),
    borderTopRightRadius: normalizeSize(14),
  },
  lastItem: {
    borderBottomLeftRadius: normalizeSize(14),
    borderBottomRightRadius: normalizeSize(14),
  },
});
