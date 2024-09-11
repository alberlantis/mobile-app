import { StyleSheet } from "react-native";

import fonts from "src/theme/fonts";
import colors from "src/theme/colors";

export default StyleSheet.create({
  container: {
    width: "100%",
    marginLeft: "2%",
  },
  title: {
    fontSize: fonts[16],
    color: colors.WHITE,
    fontWeight: "semibold",
  },
  webpage: {
    fontSize: fonts[14],
    fontWeight: "medium",
    marginVertical: "1%",
    color: colors.BLUE_SECONDARY,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationName: {
    color: colors.WHITE_BOLD,
    fontWeight: "bold",
    marginLeft: "2%",
  },
  locationType: {
    fontWeight: "regular",
  },
});
