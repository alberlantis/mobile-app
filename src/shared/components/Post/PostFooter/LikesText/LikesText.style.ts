import { StyleSheet } from "react-native";

import { colors, normalizeSize, fonts } from "src/theme";

export default StyleSheet.create({
  postFollowersLikeContainer: {
    flexDirection: "row",
  },
  postFollowersLikesText: {
    marginLeft: normalizeSize(8),
    color: colors.WHITE_BOLD,
    fontSize: fonts[14],
  },
  lastFollowerName: {
    color: colors.WHITE,
    fontWeight: fonts.semiBold,
  },
});
