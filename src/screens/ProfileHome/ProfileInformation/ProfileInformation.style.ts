import { StyleSheet, StyleProp, ViewStyle } from "react-native";

import fonts from "src/theme/fonts";
import colors from "src/theme/colors";

export const getEditContainer = (
  containerHeight: number,
): StyleProp<ViewStyle> => {
  const editIconSize = containerHeight * 0.6;
  return {
    backgroundColor: colors.GRAY_BOLD,
    width: editIconSize,
    height: editIconSize,
    borderRadius: editIconSize / 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: "2%",
    marginTop: "2%",
  };
};
export const getIconSize = (containerHeight: number): number => {
  const editIconSize = containerHeight * 0.6;
  return editIconSize * 0.5;
};
export default StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
  },
  innerContainer: {
    width: "70%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  profileDataContainer: {
    paddingVertical: "2%",
  },
  profileDataNameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileDataName: {
    fontSize: fonts[16],
    color: colors.WHITE,
    fontWeight: "semibold",
    marginRight: "2%",
  },
  profileDataTitle: {
    color: colors.WHITE_BOLD,
    marginBottom: "2%",
    fontSize: fonts[14],
  },
  followersSection: {
    flexDirection: "row",
  },
  followersNumber: {
    color: colors.WHITE,
    fontSize: fonts[14],
  },
  followersLabel: {
    color: colors.WHITE_BOLD,
  },
});
