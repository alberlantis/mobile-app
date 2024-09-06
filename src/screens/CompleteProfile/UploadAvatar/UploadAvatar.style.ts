import { StyleSheet, Dimensions } from "react-native";

import colors from "src/theme/colors";

const screenWidth = Dimensions.get("window").width;
const containerSize = screenWidth * 0.45;
const innerContainerSize = containerSize / 1.5;
const buttonCameraOuterContainer = innerContainerSize / 3;
const buttonCameraInnerContainer = buttonCameraOuterContainer / 1.3;

export const cameraIconSize = buttonCameraInnerContainer * 0.5;
export const userIconSize = innerContainerSize * 0.5;
export default StyleSheet.create({
  container: {
    width: containerSize,
    height: containerSize,
    borderRadius: screenWidth / 2,
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.GRAY_2,
    borderStyle: "dashed",
    borderWidth: containerSize * 0.01,
  },
  innerContainer: {
    width: innerContainerSize,
    height: innerContainerSize,
    borderRadius: innerContainerSize / 2,
    backgroundColor: colors.GRAY_2,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonOuterContainer: {
    width: buttonCameraOuterContainer,
    height: buttonCameraOuterContainer,
    borderRadius: buttonCameraOuterContainer / 2,
    backgroundColor: colors.BLACK_LIGHT,
    position: "absolute",
    bottom: -buttonCameraOuterContainer / 2.5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonInnerContainer: {
    width: buttonCameraInnerContainer,
    height: buttonCameraInnerContainer,
    borderRadius: buttonCameraInnerContainer / 2,
    backgroundColor: colors.GRAY_2,
    alignItems: "center",
    justifyContent: "center",
  },
});
