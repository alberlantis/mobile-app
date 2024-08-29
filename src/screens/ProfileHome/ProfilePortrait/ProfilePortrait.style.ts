import { StyleSheet } from "react-native";

import colors from "src/theme/colors";

export default StyleSheet.create({
  topHeaderContainer: {
    width: "100%",
    height: 60,
    alignItems: "center",
    position: "absolute",
    zIndex: 1,
    flexDirection: "row",
  },
  changeProfileButton: {
    backgroundColor: colors.BLACK_MEDIUM,
    borderRadius: 50,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
  },
  ownProfileButton: {
    backgroundColor: colors.BLACK_MEDIUM,
    borderRadius: 50,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  shareButton: {
    backgroundColor: colors.BLACK_MEDIUM,
    borderRadius: 50,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    right: 0,
    position: "absolute",
    marginRight: 20,
  },
  image: {
    width: "100%",
    height: 120,
  },
});
