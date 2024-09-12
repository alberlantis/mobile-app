import { StyleSheet } from "react-native";

import { colors, fonts, normalizeSize } from "src/theme";

export default StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: normalizeSize(17),
    paddingVertical: normalizeSize(12),
    borderBottomWidth: normalizeSize(1),
    borderBottomColor: colors.GRAY,
  },
  title: {
    fontSize: fonts[16],
    color: colors.WHITE,
    fontWeight: "semibold",
  },
  webpage: {
    fontSize: fonts[14],
    fontWeight: "medium",
    marginBottom: normalizeSize(12),
    color: colors.BLUE_SECONDARY,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationName: {
    color: colors.WHITE_BOLD,
    fontWeight: "bold",
    marginLeft: normalizeSize(6),
    fontSize: fonts[12],
  },
  locationType: {
    fontWeight: "regular",
  },
});
