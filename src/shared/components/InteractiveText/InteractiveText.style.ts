import { StyleSheet } from "react-native";

import { fonts } from "src/theme";

export default StyleSheet.create({
  container: {
    fontSize: fonts[14],
    fontWeight: "regular",
  },
  interactiveText: {
    textDecorationLine: "underline",
  },
});
