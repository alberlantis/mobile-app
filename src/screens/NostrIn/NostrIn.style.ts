import { StyleSheet } from "react-native";

import fonts from "src/theme/fonts";
import colors from "src/theme/colors";

export default StyleSheet.create({
  container: {
    marginHorizontal: "2%",
    alignItems: "center",
    flex: 1,
  },
  logoContainer: {
    alignItems: "center",
    width: "100%",
    height: "25%",
  },
  inputContainer: {
    alignItems: "center",
    width: "100%",
    height: "15%",
  },
  buttonContainer: {
    alignItems: "center",
    width: "100%",
    height: "54%",
    justifyContent: "flex-start",
  },
  textDescription: {
    color: colors.WHITE_BOLD,
    textAlign: "center",
    fontSize: fonts[14],
  },
});
