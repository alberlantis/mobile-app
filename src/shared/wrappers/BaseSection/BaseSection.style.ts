import { StyleSheet } from "react-native";

import { colors, fonts } from "src/theme";

export default StyleSheet.create({
  sectionTitle: {
    color: colors.WHITE_BOLD,
    fontSize: fonts[12],
    marginBottom: "2%",
  },
  sectionSeparator: {
    backgroundColor: "red",
    width: "100%",
    marginVertical: "1%",
  },
});
