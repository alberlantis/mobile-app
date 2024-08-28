import { StyleSheet } from "react-native";

import colors from "src/theme/colors";

export default StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
  },
  profilePhotoOutterContainer: {
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  profilePhotoInnerContainer: {
    position: "absolute",
    top: -30,
  },
  profilePhoto: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  profilePhotoCheckIcon: {
    backgroundColor: colors.ORANGE_PRIMARY_DARK,
    width: 24,
    height: 24,
    position: "absolute",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    bottom: 0,
    right: 0,
  },
  profileDataContainer: {
    width: "70%",
    paddingVertical: 5,
  },
  profileDataNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  profileDataName: {
    fontSize: 16,
    color: colors.WHITE,
    fontWeight: "semibold",
    marginRight: 10,
  },
  profileDataTitle: { color: colors.WHITE_BOLD, marginBottom: 5 },
  followersSection: {
    flexDirection: "row",
    marginBottom: 5,
  },
  followersNumber: {
    color: colors.WHITE,
  },
  followersLabel: {
    color: colors.WHITE_BOLD,
  },
});
