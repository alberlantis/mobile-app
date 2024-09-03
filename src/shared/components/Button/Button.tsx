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
  TextStyle,
  ActivityIndicator,
} from "react-native";
import Svg, {
  Defs,
  ClipPath,
  LinearGradient,
  Stop,
  Rect,
} from "react-native-svg";

import s from "./Button.style";
import colors from "src/theme/colors";

type ButtonSize = "large" | "extra-large" | "regular" | "auto";
type ButtonTheme = "primary" | "secondary" | "disabled" | "off";
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
  extraPadding?: number;
  textStyle?: TextStyle;
  loading?: boolean;
  prefixElement?(): React.ComponentElement<any, any>;
  subfixElement?(): React.ComponentElement<any, any>;
  onPress(event?: GestureResponderEvent): void;
}

const getColors = (theme: ButtonTheme): ColorValue[] => {
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
  extraPadding = 40,
  textStyle,
  loading,
  subfixElement,
  prefixElement,
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
        setDynamicWidth(event.nativeEvent.layout.width + extraPadding);
      }
    },
    [isAutoSize, extraPadding, setDynamicWidth],
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
        {!!prefixElement && prefixElement()}
        {loading ? (
          <ActivityIndicator
            color={textStyle?.color || colors.WHITE}
            size={textStyle?.fontSize || 16}
          />
        ) : (
          <Text style={StyleSheet.flatten([s.defaultText, textStyle])}>
            {text}
          </Text>
        )}
        {!!subfixElement && subfixElement()}
      </View>
    </Pressable>
  );
};

export default Button;