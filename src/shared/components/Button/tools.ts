import {
  DimensionValue,
  Dimensions,
  ColorValue,
  StyleProp,
  ViewStyle,
  Animated,
} from "react-native";

import colors from "src/theme/colors";

export type ButtonSize = "large" | "fill" | "regular" | "auto";
export type ButtonTheme =
  | "primary"
  | "secondary"
  | "disabled"
  | "off"
  | "primary-outline";
type NumberProp = string | number;
type ButtonDimensions = {
  width?: NumberProp & DimensionValue;
  height: NumberProp & DimensionValue;
};
type RadiusValue =
  | number
  | "auto"
  | `${number}%`
  | (string & Animated.AnimatedNode)
  | undefined;

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

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
        width: 0,
        height: 0,
      };
  }
};

export const getRadius = (
  value: (NumberProp & DimensionValue) | undefined,
): RadiusValue => {
  const sanitizeValue: (NumberProp & DimensionValue) | undefined =
    typeof value === "string" ? parseInt(value, 10) : value;
  if (!sanitizeValue) return value;
  return sanitizeValue / (sanitizeValue * 0.05);
};

export const getOutline = (
  theme: ButtonTheme,
  radius: RadiusValue,
): StyleProp<ViewStyle> => {
  if (!theme.includes("outline")) return {};
  switch (theme) {
    case "primary-outline":
    default: {
      return {
        borderRadius: (radius as number) - 5,
        borderColor: colors.ORANGE_PRIMARY,
        borderWidth: 1,
      };
    }
  }
};
