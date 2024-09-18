import { StyleSheet } from "react-native";

import { colors, normalizeSize, fonts } from "src/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BLACK,
  },
  headerContainer: {
    paddingHorizontal: normalizeSize(16),
    marginBottom: normalizeSize(8),
  },
  headerProfileInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: normalizeSize(16),
    paddingVertical: normalizeSize(19),
  },
  avatarNameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  nameText: {
    color: colors.WHITE,
    fontSize: fonts[14],
    fontWeight: fonts.semiBold,
    marginLeft: normalizeSize(8),
    marginRight: normalizeSize(12),
  },
  timePost: {
    color: colors.WHITE_BOLD,
    fontSize: fonts[14],
    fontWeight: fonts.semiBold,
  },
  locationMenuButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    color: colors.WHITE_BOLD,
    fontSize: fonts[14],
    fontWeight: fonts.medium,
    marginLeft: normalizeSize(4),
    marginRight: normalizeSize(16),
  },
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
