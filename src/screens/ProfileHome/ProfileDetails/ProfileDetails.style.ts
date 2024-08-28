import { StyleSheet } from "react-native";

import colors from "src/theme/colors";

export default StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 15,
    marginLeft: 15,
  },
  title: {
    fontSize: 16,
    color: colors.WHITE,
    fontWeight: "semibold",
  },
  webpage: {
    fontSize: 14,
    fontWeight: "medium",
    marginTop: 3,
    marginBottom: 10,
    color: colors.BLUE_SECONDARY,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationName: {
    color: colors.WHITE_BOLD,
    fontWeight: "bold",
    marginLeft: 5,
  },
  locationType: {
    fontWeight: "regular",
  },
});
