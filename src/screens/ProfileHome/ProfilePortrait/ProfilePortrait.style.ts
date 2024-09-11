import { StyleSheet } from "react-native";

import { imageHeight } from "src/shared/components/ImagePortrait";
import colors from "src/theme/colors";

const headerHeight = imageHeight * 0.4;
const headerButtonsSize = headerHeight * 0.75;

export const iconsSize = headerButtonsSize * 0.5;

export default StyleSheet.create({
  topHeaderContainer: {
    width: "100%",
    alignItems: "center",
    position: "absolute",
    zIndex: 1,
    flexDirection: "row",
    paddingVertical: "2%",
    height: headerHeight,
    paddingLeft: "2%",
  },
  changeProfileButton: {
    backgroundColor: colors.BLACK_MEDIUM,
    borderRadius: headerButtonsSize / 2,
    height: headerButtonsSize,
    width: headerButtonsSize,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "2%",
  },
  ownProfileButton: {
    backgroundColor: colors.BLACK_MEDIUM,
    borderRadius: headerButtonsSize / 2,
    height: headerButtonsSize,
    width: headerButtonsSize,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "2%",
  },
  shareButton: {
    backgroundColor: colors.BLACK_MEDIUM,
    borderRadius: headerButtonsSize / 2,
    height: headerButtonsSize,
    width: headerButtonsSize,
    justifyContent: "center",
    alignItems: "center",
    right: 0,
    position: "absolute",
    marginRight: "2%",
  },
});
