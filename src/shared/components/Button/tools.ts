import { DimensionValue, ColorValue, StyleProp, ViewStyle } from "react-native";

import colors from "src/theme/colors";

type NumberProp = string | number;
export type ButtonSize = "fill" | "auto";
export type ButtonTheme =
  | "primary"
  | "secondary"
  | "disabled"
  | "off"
  | "primary-outline";
export type ButtonDimensions = {
  width: number;
  height: number;
};

export const getColors = (theme: ButtonTheme): ColorValue[] => {
  switch (theme) {
    case "secondary":
      return [colors.BLUE_PRIMARY, colors.BLUE_PRIMARY];
    case "disabled":
      return [colors.GRAY_BOLD, colors.GRAY_BOLD];
    case "off":
      return [colors.WHITE_GRAY, colors.WHITE_GRAY];
    case "primary-outline":
      return [colors.TRANSPARENT, colors.TRANSPARENT];
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

export const getRadius = (dynamicSize: ButtonDimensions): NumberProp => {
  const buttonRadiusRation = 200 / 300;
  return buttonRadiusRation * Math.min(dynamicSize.width, dynamicSize.height);
};

export const getOutline = (
  theme: ButtonTheme,
  radius: NumberProp,
): StyleProp<ViewStyle> => {
  if (!theme.includes("outline")) return {};
  switch (theme) {
    case "primary-outline":
    default: {
      return {
        borderRadius: radius as number,
        borderColor: colors.ORANGE_PRIMARY,
        borderWidth: 1,
      };
    }
  }
};
