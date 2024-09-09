import { StyleSheet, Dimensions } from "react-native";

import fonts from "src/theme/fonts";
import colors from "src/theme/colors";

const screenHeight = Dimensions.get("window").height;

export default StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    marginHorizontal: "2%",
  },
  keyboardContainer: {
    flex: 1,
    alignItems: "center",
    height: "75%",
  },
  titleContainer: {
    width: "100%",
    height: "15%",
    alignItems: "center",
  },
  titleDescription: {
    color: colors.WHITE_BOLD,
    textAlign: "center",
    fontSize: fonts[16],
    marginTop: screenHeight * 0.01,
  },
  uploadAvataContainer: {
    width: "100%",
    height: "42.5%",
    alignItems: "center",
    justifyContent: "center",
  },
  inputsContainer: {
    width: "100%",
    height: "42.5%",
    alignItems: "center",
  },
  input: {
    marginTop: screenHeight * 0.02,
    height: screenHeight * 0.12,
  },
  buttonContainer: {
    width: "100%",
    height: "17%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonDescriptionText: {
    color: colors.WHITE_BOLD,
    textAlign: "center",
    fontSize: fonts[16],
    marginTop: screenHeight * 0.06,
    marginBottom: screenHeight * 0.02,
  },
  button: {
    marginBottom: screenHeight * 0.02,
  },
  bottomContainer: {
    width: "100%",
    height: "2%",
    justifyContent: "center",
    alignItems: "center",
  },
});
