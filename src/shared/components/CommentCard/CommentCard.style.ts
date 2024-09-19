import { StyleSheet } from "react-native";

import { colors, normalizeSize, fonts } from "src/theme";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  innerContainer: {
    flexDirection: "row",
  },
  informationContainer: {
    marginLeft: normalizeSize(8),
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: normalizeSize(2),
  },
  name: {
    color: colors.WHITE_BOLD,
    fontSize: fonts[12],
    fontWeight: fonts.semiBold,
    marginRight: normalizeSize(8),
  },
  createAt: {
    color: colors.WHITE_BOLD,
    fontSize: fonts[12],
    fontWeight: fonts.medium,
    marginRight: normalizeSize(4),
  },
  comment: {
    color: colors.WHITE,
    fontSize: fonts[14],
    fontWeight: fonts.regular,
    marginBottom: normalizeSize(4),
  },
  replyButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  reply: {
    color: colors.WHITE_BOLD,
    fontSize: fonts[12],
    fontWeight: fonts.medium,
    marginLeft: normalizeSize(4),
  },
  replyContainer: {
    paddingTop: normalizeSize(16),
  },
});
