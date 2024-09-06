import { DimensionValue, Dimensions, ColorValue } from "react-native";

import colors from "src/theme/colors";

export type ButtonSize = "large" | "fill" | "regular" | "auto";
export type ButtonTheme = "primary" | "secondary" | "disabled" | "off";
type NumberProp = string | number;
type ButtonDimensions = {
  width?: NumberProp & DimensionValue;
  height: NumberProp & DimensionValue;
};

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export const getColors = (theme: ButtonTheme): ColorValue[] => {
  switch (theme) {
    case "secondary":
      return [colors.BLUE_PRIMARY, colors.BLUE_PRIMARY];
    case "disabled":
      return [colors.GRAY_BOLD, colors.GRAY_BOLD];
    case "off":
      return [colors.WHITE_GRAY, colors.WHITE_GRAY];
    case "primary":
    default:
      return [colors.ORANGE_PRIMARY_DARK, colors.ORANGE_PRIMARY_LIGHT];
  }
};

export const getSize = (size?: ButtonSize): ButtonDimensions => {
  const largeHeight = screenHeight * 0.07;
  const defaultHeight = screenHeight * 0.06;
  switch (size) {
    case "regular": {
      return {
        width: screenWidth * 0.35,
        height: defaultHeight,
      };
    }
    case "fill": {
      return {
        width: "100%",
        height: largeHeight,
      };
    }
    case "large":
      return {
        width: screenWidth * 0.8,
        height: largeHeight,
      };
    default:
      return {
        height: defaultHeight,
      };
  }
};

export const getRadius = (value: (NumberProp & DimensionValue) | undefined) => {
  const sanitizeValue: (NumberProp & DimensionValue) | undefined =
    typeof value === "string" ? parseInt(value, 10) : value;
  if (!sanitizeValue) return value;
  return sanitizeValue / (sanitizeValue * 0.04);
};
