import { StyleSheet, Dimensions } from "react-native";

import colors from "src/theme/colors";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  active: {
    width: screenWidth * 0.06,
    height: screenHeight * 0.002,
    backgroundColor: colors.ORANGE_PRIMARY_LIGHT,
    borderRadius: 20,
  },
  inactive: {
    width: screenWidth * 0.035,
    height: screenHeight * 0.002,
    backgroundColor: colors.WHITE,
    borderRadius: 20,
    opacity: 0.5,
  },
});
