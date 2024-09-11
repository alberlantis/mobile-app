import { StyleSheet, Dimensions } from "react-native";

import colors from "src/theme/colors";

const { width: screenWidth } = Dimensions.get("window");
const containerSize = screenWidth * 0.3;
const imageSize = containerSize * 0.75;
const checkIconContainer = imageSize * 0.25;

export const checkIconSize = checkIconContainer * 0.75;
export default StyleSheet.create({
  container: {
    width: containerSize,
    alignItems: "center",
    zIndex: 1,
  },
  profilePhotoInnerContainer: {
    position: "absolute",
    top: -(imageSize / 2),
  },
  profilePhoto: {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  },
  profilePhotoCheckIcon: {
    backgroundColor: colors.ORANGE_PRIMARY_DARK,
    width: checkIconContainer,
    height: checkIconContainer,
    position: "absolute",
    borderRadius: checkIconContainer / 2,
    alignItems: "center",
    justifyContent: "center",
    bottom: 0,
    right: 0,
  },
});
