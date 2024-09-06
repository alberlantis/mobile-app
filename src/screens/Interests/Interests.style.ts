import { StyleSheet, Dimensions } from "react-native";

import fonts from "src/theme/fonts";
import colors from "src/theme/colors";

const screenHeight = Dimensions.get("window").height;

export default StyleSheet.create({
  container: {
    marginHorizontal: "2%",
    alignItems: "center",
    flex: 1,
  },
  headerContainer: {
    width: "100%",
    height: "20%",
    alignItems: "center",
  },
  textDescription: {
    color: colors.WHITE_BOLD,
    textAlign: "center",
    fontSize: fonts[14],
    marginTop: "5%",
    width: "90%",
  },
  optionsListContainer: {
    width: "100%",
    height: "55%",
  },
  buttonContainer: {
    width: "100%",
    height: "17%",
    justifyContent: "flex-end",
  },
  bottomContainer: {
    width: "100%",
    height: "2%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttomMargin: {
    marginBottom: screenHeight * 0.02,
  },
});
