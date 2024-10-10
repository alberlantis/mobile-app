import { StyleSheet } from "react-native";

import { colors, fonts, normalizeSize } from "src/theme";

export default StyleSheet.create({
  searchBarContainer: {
    flex: 1,
    justifyContent: "center",
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.BLACK_2,
    paddingHorizontal: normalizeSize(16),
    borderRadius: normalizeSize(16),
    borderWidth: normalizeSize(1),
    justifyContent: "center",
  },
  searchInput: {
    flex: 1,
    fontSize: fonts[14],
    color: colors.WHITE,
  },
  searchIcon: {
    marginRight: normalizeSize(4),
  },
  backButtonContainer: {
    marginRight: normalizeSize(12),
  },
  cityLabel: {
    color: colors["F-66"],
    fontSize: fonts[12],
    marginTop: normalizeSize(8),
    paddingLeft: normalizeSize(16),
  },
});
