import { StyleProp, StyleSheet, ViewStyle, Dimensions } from "react-native";

import fonts from "src/theme/fonts";
import colors from "src/theme/colors";

const screenHeight = Dimensions.get("window").height;

export const copyIconSize = fonts[16];
export const getButtonContainer = (showKey: boolean): StyleProp<ViewStyle> => ({
  alignItems: "center",
  width: "100%",
  height: showKey ? "17%" : "52%",
  justifyContent: showKey ? "flex-end" : "flex-start",
});
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
  privateKeyContainer: {
    alignItems: "center",
    width: "100%",
    height: "35%",
    justifyContent: "space-around",
  },
  button: {
    marginBottom: screenHeight * 0.02,
  },
  bottomContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "2%",
  },
  textDescription: {
    color: colors.WHITE_BOLD,
    textAlign: "center",
    fontSize: fonts[14],
  },
  nsecKeyContainer: {
    width: "100%",
    height: "65%",
    backgroundColor: colors.GRAY_LIGHT,
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 30,
    paddingHorizontal: "10%",
  },
  nsecTitle: {
    color: colors.WHITE,
    fontWeight: "bold",
    fontSize: fonts[14],
  },
  nsecKey: {
    color: colors.WHITE_BOLD,
    textAlign: "center",
    fontSize: fonts[14],
  },
  copyButton: { color: colors.WHITE_BOLD, marginLeft: 5 },
});
