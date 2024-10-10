import { StyleSheet } from "react-native";

import { colors, normalizeSize, fonts } from "src/theme";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: normalizeSize(16),
    paddingVertical: normalizeSize(12),
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: colors.GRAY,
    borderBottomWidth: normalizeSize(1),
  },
  innerContainer: {
    flexDirection: "row",
    width: "60%",
    alignItems: "center",
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
    fontWeight: fonts.regular,
    marginBottom: normalizeSize(4),
  },
  description: {
    color: colors.WHITE_BOLD,
    fontSize: fonts[12],
    fontWeight: fonts.medium,
  },
  raitingsText: {
    color: colors["F-66"],
    fontWeight: fonts.medium,
    fontSize: fonts[14],
    marginRight: normalizeSize(4.5),
  },
  raitingsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  emptyImageContainer: {
    backgroundColor: colors.GRAY_BOLD,
    width: normalizeSize(48),
    height: normalizeSize(48),
    borderRadius: normalizeSize(48) / 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
