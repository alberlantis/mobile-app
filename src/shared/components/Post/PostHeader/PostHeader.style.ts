import { StyleSheet } from "react-native";

import { colors, normalizeSize, fonts } from "src/theme";

export default StyleSheet.create({
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
});
