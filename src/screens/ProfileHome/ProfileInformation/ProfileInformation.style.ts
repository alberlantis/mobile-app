import { StyleSheet } from "react-native";

import colors from "src/theme/colors";

export default StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
  },
  profileDataContainer: {
    width: "70%",
    paddingVertical: 5,
    marginBottom: 5,
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
