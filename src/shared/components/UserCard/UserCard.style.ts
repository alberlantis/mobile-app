import { StyleSheet } from "react-native";

import { colors, normalizeSize, fonts } from "src/theme";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: normalizeSize(16),
    paddingVertical: normalizeSize(12),
    alignItems: "center",
    justifyContent: "space-between",
  },
  innerContainer: {
    flexDirection: "row",
    width: "60%",
  },
  informationContainer: {
    marginLeft: normalizeSize(12),
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: normalizeSize(4),
  },
  name: {
    color: colors.WHITE,
    fontSize: fonts[14],
    fontWeight: fonts.semiBold,
    marginRight: normalizeSize(4),
  },
  job: {
    color: colors.WHITE,
    fontSize: fonts[12],
    fontWeight: fonts.medium,
    marginBottom: normalizeSize(2),
  },
  totalFollowers: {
    color: colors.WHITE_BOLD,
    fontSize: fonts[12],
    fontWeight: fonts.medium,
  },
  buttonText: {
    fontSize: fonts[12],
    fontWeight: fonts.semiBold,
  },
});
