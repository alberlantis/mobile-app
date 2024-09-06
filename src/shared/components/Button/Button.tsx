import React, { useCallback, useState } from "react";
import {
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

import {
  getColors,
  getRadius,
  getSize,
  type ButtonSize,
  type ButtonTheme,
} from "./tools";
import s from "./Button.style";
import colors from "src/theme/colors";

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
  const { width: staticWidth, height: buttonHeight } = getSize(size);
  const [dynamicWidth, setDynamicWidth] = useState<number | undefined>(
    undefined,
  );
  const buttonWidth = staticWidth ?? dynamicWidth;
  const isAutoSize = size === "auto";
  const buttonRadius = getRadius(buttonWidth);

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
          height: buttonHeight,
          width: buttonWidth,
        },
      ])}
      onPress={onPress}
      testID="button-pressable-id"
    >
      {!!buttonWidth && (
        <Svg width={buttonWidth} style={StyleSheet.absoluteFillObject}>
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
                height={buttonHeight}
                rx={buttonRadius}
                ry={buttonRadius}
              />
            </ClipPath>
          </Defs>
          <Rect
            x="0"
            y="0%"
            width={buttonWidth}
            height={buttonHeight}
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
            size={16}
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
