import React, { useCallback, useState } from "react";
import {
  ColorValue,
  DimensionValue,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
  LayoutChangeEvent,
} from "react-native";
import Svg, {
  Defs,
  ClipPath,
  LinearGradient,
  Stop,
  Rect,
} from "react-native-svg";

import type { IconProps, IconType } from "../Icon";
import s from "./Button.style";
import colors from "src/theme/colors";

type ButtonSize = "large" | "extra-large" | "regular" | "auto";
type ButtonTheme = "primary" | "secondary" | "disabled";
type NumberProp = string | number;
type ButtonDimensions = {
  width?: NumberProp & DimensionValue;
  height: NumberProp & DimensionValue;
};

export interface IButtonProps {
  size?: ButtonSize;
  theme: ButtonTheme;
  text: string;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  buttonIcon?(): React.ComponentElement<IconProps<IconType>, any>;
  onPress(event?: GestureResponderEvent): void;
}

const getColors = (theme: ButtonTheme): ColorValue[] => {
  switch (theme) {
    case "secondary":
      return [colors.BLUE_PRIMARY, colors.BLUE_PRIMARY];
    case "disabled":
      return [colors.GRAY_BOLD, colors.GRAY_BOLD];
    case "primary":
    default:
      return [colors.ORANGE_PRIMARY_DARK, colors.ORANGE_PRIMARY_LIGHT];
  }
};
const getSize = (size?: ButtonSize): ButtonDimensions => {
  switch (size) {
    case "regular": {
      return {
        width: 130,
        height: 40,
      };
    }
    case "extra-large": {
      return {
        width: "100%",
        height: 50,
      };
    }
    case "large":
      return {
        width: 300,
        height: 50,
      };
    default:
      return {
        height: 40,
      };
  }
};

const Button: React.FC<IButtonProps> = ({
  size,
  theme,
  text,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  buttonIcon,
  onPress,
}) => {
  const linearGradientID = "linGrad";
  const clipGradientID = "clipGrad";
  const buttonColor = getColors(theme);
  const { width: staticWidth, height } = getSize(size);
  const [dynamicWidth, setDynamicWidth] = useState<number | undefined>(
    undefined,
  );
  const buttonWidth = staticWidth ?? dynamicWidth;
  const isAutoSize = size === "auto";

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      if (isAutoSize) {
        setDynamicWidth(
          event.nativeEvent.layout.width + (buttonIcon ? 60 : 40),
        );
      }
    },
    [isAutoSize, buttonIcon, setDynamicWidth],
  );

  return (
    <Pressable
      style={StyleSheet.flatten([
        s.container,
        {
          marginTop,
          marginBottom,
          marginLeft,
          marginRight,
          height,
          width: buttonWidth,
          alignSelf: isAutoSize ? "flex-start" : "auto",
        },
      ])}
      onPress={onPress}
      testID="button-pressable-id"
    >
      {!!buttonWidth && (
        <Svg
          width={buttonWidth}
          height={height}
          style={StyleSheet.absoluteFillObject}
        >
          <Defs>
            <LinearGradient
              id={linearGradientID}
              x1="0%"
              x2="100%"
              y1="0%"
              y2="100%"
            >
              <Stop offset="0%" stopColor={buttonColor[0]} />
              <Stop offset="100%" stopColor={buttonColor[1]} />
            </LinearGradient>
            <ClipPath id={clipGradientID}>
              <Rect
                x="0"
                y="0"
                width={buttonWidth}
                height={height}
                rx="25"
                ry="50"
              />
            </ClipPath>
          </Defs>
          <Rect
            x="0"
            y="0%"
            width={buttonWidth}
            height={height}
            clipPath={`url(#${clipGradientID})`}
            fill={`url(#${linearGradientID})`}
          />
        </Svg>
      )}
      <View style={s.contentContainer} onLayout={handleLayout}>
        {!!buttonIcon && buttonIcon()}
        <Text style={s.defaultText}>{text}</Text>
      </View>
    </Pressable>
  );
};

export default Button;
