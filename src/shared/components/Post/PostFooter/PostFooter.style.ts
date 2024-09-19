import { StyleSheet } from "react-native";

import { colors, normalizeSize, fonts } from "src/theme";

export default StyleSheet.create({
  postDescriptionContainer: {
    paddingHorizontal: normalizeSize(16),
    paddingVertical: normalizeSize(12),
  },
  postActionsContainer: {
    flexDirection: "row",
    paddingVertical: normalizeSize(12),
  },
  commentAction: { marginLeft: normalizeSize(8) },
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
  addCommentContainer: {
    flexDirection: "row",
    paddingTop: normalizeSize(8),
  },
  addCommentPlaceholder: {
    color: colors.WHITE_BOLD,
    fontWeight: fonts.medium,
    marginLeft: normalizeSize(4),
  },
});
