import { StyleSheet, Dimensions } from "react-native";

import colors from "src/theme/colors";
import fonts from "src/theme/fonts";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");
const emailIconContainerSize = screenWidth * 0.15;
const screenMarginSeparator = screenHeight * 0.04;

export const emailIconSize = emailIconContainerSize * 0.5;

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: "2%",
  },
  emailIconContainer: {
    width: emailIconContainerSize,
    height: emailIconContainerSize,
    backgroundColor: colors.BLACK_TRANSPARENT,
    borderRadius: emailIconContainerSize / 4,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: screenMarginSeparator,
  },
  emailRecoveryDescription: {
    fontSize: fonts[14],
    color: colors.WHITE_BOLD,
    textAlign: "center",
    width: "75%",
    marginVertical: screenMarginSeparator,
  },
  input: {
    marginTop: screenMarginSeparator,
  },
  button: {
    marginTop: screenMarginSeparator,
  },
});
