import { StyleSheet } from "react-native";

import { colors, normalizeSize } from "src/theme";

export default StyleSheet.create({
  container: {
    paddingHorizontal: normalizeSize(17),
    paddingTop: normalizeSize(12),
    paddingBottom: normalizeSize(16),
    borderBottomColor: colors.GRAY,
    borderBottomWidth: normalizeSize(1),
  },
  innerContainer: {
    flexDirection: "row",
    paddingVertical: normalizeSize(16),
    paddingHorizontal: normalizeSize(16),
    borderRadius: normalizeSize(16),
    backgroundColor: colors.BLACK_2,
  },
  interestsTagPanel: {
    width: "90%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    paddingHorizontal: normalizeSize(16),
    backgroundColor: colors.GRAY_BOLD,
    borderRadius: normalizeSize(16),
    paddingVertical: normalizeSize(2.5),
    marginRight: normalizeSize(8),
    marginTop: normalizeSize(8),
  },
  editButton: { width: "10%", alignItems: "flex-end" },
  loadingContainer: {
    flex: 1,
  },
});
