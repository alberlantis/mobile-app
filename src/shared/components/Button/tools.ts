import { DimensionValue, ColorValue, StyleProp, ViewStyle } from "react-native";

import { type DimensionSize, colors } from "src/theme";

type NumberProp = string | number;
export type ButtonSize = "fill" | "auto";
export type ButtonTheme =
  | "primary"
  | "secondary"
  | "disabled"
  | "off"
  | "primary-outline"
  | "off-secondary"
  | "off-outline"
  | "green";

export const getColors = (theme: ButtonTheme): ColorValue[] => {
  switch (theme) {
    case "off-secondary":
      return [colors.BLACK_3, colors.BLACK_3];
    case "off-outline":
      return [colors.TRANSPARENT, colors.TRANSPARENT];
    case "secondary":
      return [colors.BLUE_PRIMARY, colors.BLUE_PRIMARY];
    case "disabled":
      return [colors.GRAY_BOLD, colors.GRAY_BOLD];
    case "off":
      return [colors.WHITE_GRAY, colors.WHITE_GRAY];
    case "primary-outline":
      return [colors.TRANSPARENT, colors.TRANSPARENT];
    case "green":
      return [colors.GREEN, colors.GREEN_2];
    case "primary":
    default:
      return [colors.ORANGE_PRIMARY_DARK, colors.ORANGE_PRIMARY_LIGHT];
  }
};

export const getSize = (size?: ButtonSize): DimensionValue => {
  switch (size) {
    case "fill": {
      return "100%";
    }
    default:
      return "auto";
  }
};

export const getRadius = (dynamicSize: DimensionSize): NumberProp => {
  const buttonRadiusRation = 1 / 2;
  return buttonRadiusRation * Math.min(dynamicSize.width, dynamicSize.height);
};

export const getOutline = (
  theme: ButtonTheme,
  radius: NumberProp,
): StyleProp<ViewStyle> => {
  if (!theme.includes("outline")) return {};
  let borderColor: ColorValue;
  switch (theme) {
    case "off-outline":
      borderColor = colors.GRAY_4;
      break;
    case "primary-outline":
    default:
      borderColor = colors.ORANGE_PRIMARY;
  }
  return {
    borderRadius: radius as number,
    borderColor,
    borderWidth: 1,
  };
};
