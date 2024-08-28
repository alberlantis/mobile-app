import { StyleSheet } from "react-native";

import colors from "src/theme/colors";

export default StyleSheet.create({
  shareButtonContainer: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingEnd: 20,
    position: "absolute",
    zIndex: 1,
  },
  shareButton: {
    backgroundColor: colors.BLACK_MEDIUM,
    borderRadius: 50,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 120,
  },
});
