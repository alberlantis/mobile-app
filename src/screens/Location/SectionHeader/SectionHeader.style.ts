import { StyleSheet } from "react-native";
import { colors, normalizeSize, fonts } from "src/theme";

export default StyleSheet.create({
  loadingContainer: {
    paddingVertical: normalizeSize(20),
  },
  sectionHeaderContainer: {
    paddingTop: normalizeSize(12),
    paddingBottom: normalizeSize(4),
    paddingHorizontal: normalizeSize(12),
    backgroundColor: colors.BLACK,
  },
  sectionHeaderTitle: {
    fontWeight: fonts.regular,
    fontSize: normalizeSize(12),
    color: colors["F-66"],
  },
});
