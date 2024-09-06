import {
  StyleSheet,
  Dimensions,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";

import fonts from "src/theme/fonts";
import colors from "src/theme/colors";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const borderRadius = screenWidth * 0.03;

export const getInputStyle = (
  hasIcon: boolean,
  isTextArea: boolean,
): StyleProp<TextStyle> => ({
  width: hasIcon ? "90%" : "100%",
  height: "100%",
  borderTopLeftRadius: borderRadius,
  borderBottomLeftRadius: borderRadius,
  borderTopRightRadius: hasIcon ? 0 : borderRadius,
  borderBottomRightRadius: hasIcon ? 0 : borderRadius,
  fontSize: fonts[16],
  fontWeight: "regular",
  paddingHorizontal: 15,
  color: colors.WHITE,
  paddingTop: isTextArea ? 15 : 0,
});
export const getInputContainer = (
  customHeight: number | undefined,
): StyleProp<ViewStyle> => ({
  width: "100%",
  height: customHeight || screenHeight * 0.06,
  backgroundColor: colors.BLACK_INPUT,
  borderRadius: borderRadius,
  flexDirection: "row",
});
export default StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    color: colors.WHITE,
    paddingLeft: 15,
    marginBottom: 10,
    fontSize: fonts[14],
    fontWeight: "regular",
  },
  iconInput: {
    width: "10%",
    borderTopRightRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    alignItems: "center",
    justifyContent: "center",
  },
});
