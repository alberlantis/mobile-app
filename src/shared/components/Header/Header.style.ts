import { StyleSheet, Dimensions } from "react-native";

import colors from "src/theme/colors";

const screenHeight = Dimensions.get("window").height;
const headerHeight = screenHeight * 0.06;
const buttonSize = headerHeight * 0.75;
const buttonRadius = buttonSize / 2;

export const iconSize = buttonSize * 0.35;
export default StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    height: screenHeight * 0.06,
  },
  button: {
    backgroundColor: colors.BLACK,
    justifyContent: "center",
    alignItems: "center",
    width: buttonSize,
    height: buttonSize,
    borderRadius: buttonRadius,
  },
});
