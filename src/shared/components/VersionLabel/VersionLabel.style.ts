import { StyleSheet } from "react-native";

import colors from "src/theme/colors";

export default StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: colors.TRANSPARENT,
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 5,
  },
  text: {
    textAlign: "center",
  },
});
