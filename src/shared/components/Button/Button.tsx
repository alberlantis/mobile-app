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
  getOutline,
  type ButtonSize,
  type ButtonTheme,
} from "./tools";
import s from "./Button.style";
import { colors, normalizeSize, type DimensionSize } from "src/theme";

export interface IButtonProps {
  size?: ButtonSize;
  theme: ButtonTheme;
  text: string;
  paddingVertical?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
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
  paddingVertical = 11,
  textStyle,
  loading,
  subfixElement,
  prefixElement,
  onPress,
}) => {
  const linearGradientID = "linGrad";
  const clipGradientID = "clipGrad";
  const isOutline = theme.includes("outline");
  const buttonColor = getColors(theme);
  const staticWidth = getSize(size);
  const [dynamicSize, setDynamicSize] = useState<DimensionSize>({
    width: 0,
    height: 0,
  });
  const buttonRadius = getRadius(dynamicSize);
  const outlineStyle = getOutline(theme, buttonRadius);
  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      setDynamicSize({
        width: event.nativeEvent.layout.width,
        height: event.nativeEvent.layout.height,
      });
    },
    [setDynamicSize],
  );
  const drawSVG = !!dynamicSize.width && !!dynamicSize.height && !isOutline;

  return (
    <Pressable
      onLayout={handleLayout}
      style={[
        s.container,
        outlineStyle,
        {
          marginTop,
          marginBottom,
          marginLeft,
          marginRight,
          width: staticWidth,
          paddingVertical: normalizeSize(paddingVertical),
        },
      ]}
      onPress={onPress}
      testID="button-pressable-id"
    >
      {drawSVG && (
        <Svg width={dynamicSize.width} style={StyleSheet.absoluteFillObject}>
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
                width={dynamicSize.width}
                height={dynamicSize.height}
                rx={buttonRadius}
                ry={buttonRadius}
              />
            </ClipPath>
          </Defs>
          <Rect
            x="0"
            y="0%"
            width={dynamicSize.width}
            height={dynamicSize.height}
            clipPath={`url(#${clipGradientID})`}
            fill={`url(#${linearGradientID})`}
          />
        </Svg>
      )}
      <View style={s.contentContainer}>
        {!!prefixElement && prefixElement()}
        {loading ? (
          <ActivityIndicator color={colors.WHITE} size={16} />
        ) : (
          <Text style={[s.defaultText, textStyle]}>{text}</Text>
        )}
        {!!subfixElement && subfixElement()}
      </View>
    </Pressable>
  );
};

export default Button;
