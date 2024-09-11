import { StyleSheet } from "react-native";

import colors from "src/theme/colors";

export default StyleSheet.create({
  container: { marginBottom: "2%", marginHorizontal: "2%" },
  innerContainer: {
    flexDirection: "row",
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.BLACK_2,
  },
  interestsTagPanel: {
    width: "90%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    paddingHorizontal: "4%",
    backgroundColor: colors.GRAY_BOLD,
    borderRadius: 15,
    paddingVertical: "1%",
    margin: "1%",
  },
  editButton: { width: "10%", alignItems: "flex-end" },
});
