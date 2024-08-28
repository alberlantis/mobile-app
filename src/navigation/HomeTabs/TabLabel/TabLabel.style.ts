import { StyleSheet } from "react-native";

import colors from "src/theme/colors";

export default StyleSheet.create({
  text: {
    fontSize: 10,
    color: colors.WHITE_LIGHT,
    fontWeight: "regular",
  },
  textFocus: { fontWeight: "bold", color: colors.WHITE },
});
