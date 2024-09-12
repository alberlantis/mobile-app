import { StyleSheet } from "react-native";

import { fonts, colors, normalizeSize } from "src/theme";

export default StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: normalizeSize(17),
    borderBottomWidth: normalizeSize(1),
    borderBottomColor: colors.GRAY,
  },
  innerContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    marginLeft: normalizeSize(16),
    marginVertical: normalizeSize(12),
  },
  profileDataNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: normalizeSize(2),
  },
  profileDataName: {
    fontSize: fonts[16],
    color: colors.WHITE,
    fontWeight: "semibold",
    marginRight: normalizeSize(8),
  },
  profileDataTitle: {
    color: colors.WHITE_BOLD,
    fontSize: fonts[14],
  },
  followersSection: {
    flexDirection: "row",
    marginTop: normalizeSize(8),
  },
  followersNumber: {
    color: colors.WHITE,
    fontSize: fonts[14],
  },
  followersLabel: {
    color: colors.WHITE_BOLD,
  },
  editButtonContainer: {
    backgroundColor: colors.GRAY_BOLD,
    width: normalizeSize(38),
    height: normalizeSize(38),
    borderRadius: normalizeSize(38) / 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
