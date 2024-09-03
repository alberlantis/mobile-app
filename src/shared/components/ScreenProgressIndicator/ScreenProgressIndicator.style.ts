import { StyleSheet } from "react-native";

import colors from "src/theme/colors";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    width: "100%",
    justifyContent: "center",
  },
  active: {
    width: 20,
    height: 1,
    backgroundColor: colors.ORANGE_PRIMARY_LIGHT,
    borderRadius: 20,
  },
  inactive: {
    width: 12,
    height: 1,
    backgroundColor: colors.WHITE,
    borderRadius: 20,
    opacity: 0.5,
  },
});
