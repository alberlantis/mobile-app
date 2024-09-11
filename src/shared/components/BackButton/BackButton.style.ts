import { ColorValue, Dimensions, StyleProp, ViewStyle } from "react-native";

const screenHeight = Dimensions.get("window").height;

export const getContainer = (
  containerHeight: number,
  color: ColorValue,
): StyleProp<ViewStyle> => {
  const headerHeight = screenHeight * containerHeight;
  const buttonSize = headerHeight * 0.75;
  const buttonRadius = buttonSize / 2;

  return {
    backgroundColor: color,
    justifyContent: "center",
    alignItems: "center",
    width: buttonSize,
    height: buttonSize,
    borderRadius: buttonRadius,
  };
};
export const getIconSize = (containerHeight: number) => {
  const headerHeight = screenHeight * containerHeight;
  const buttonSize = headerHeight * 0.75;
  return buttonSize * 0.35;
};
