import { Dimensions, StyleSheet } from "react-native";

import { colors, fonts } from "src/theme";

const { width: screenWidth } = Dimensions.get("window");
const checkboxSize = screenWidth * 0.06;

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  square: {
    width: checkboxSize,
    height: checkboxSize,
    borderRadius: checkboxSize * 0.2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: "2%",
    borderColor: colors.GRAY_MEDIUM,
  },
  label: {
    fontSize: fonts[14],
    color: colors.WHITE,
    fontWeight: "medium",
  },
});
