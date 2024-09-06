import { StyleSheet } from "react-native";

import fonts from "src/theme/fonts";
import colors from "src/theme/colors";

export default StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  defaultText: {
    color: colors.WHITE,
    fontWeight: "medium",
    fontSize: fonts[16],
  },
});
