import {
  StyleSheet,
  Dimensions,
  TextStyle,
  StyleProp,
  ViewStyle,
} from "react-native";

import fonts from "src/theme/fonts";
import colors from "src/theme/colors";

const screenHeight = Dimensions.get("window").height;
const itemSize = screenHeight * 0.15;
const iconCheckSizeContainer = itemSize / 5;

export const getItemTextStyle = (
  isOptionSelected: boolean,
): StyleProp<TextStyle> => ({
  color: isOptionSelected ? colors.WHITE : colors.WHITE_BOLD,
  fontWeight: isOptionSelected ? "semibold" : "regular",
  fontSize: fonts[14],
  textAlign: "center",
  width: "85%",
});
export const getButtonContainer = (
  isOptionSelected: boolean,
  isColumnLast: boolean,
): StyleProp<ViewStyle> => ({
  borderColor: isOptionSelected ? colors.WHITE : colors.GRAY_2,
  width: itemSize,
  height: itemSize,
  borderRadius: itemSize / 2,
  borderStyle: isOptionSelected ? "solid" : "dashed",
  marginRight: isColumnLast ? 0 : 10,
  borderWidth: 1,
  justifyContent: "center",
  alignItems: "center",
});
export const iconCheckSize = iconCheckSizeContainer * 0.7;
export default StyleSheet.create({
  selectedIcon: {
    backgroundColor: colors.BLACK,
    position: "absolute",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    width: iconCheckSizeContainer,
    height: iconCheckSizeContainer,
    top: itemSize * 0.07,
    right: itemSize * 0.03,
  },
});
