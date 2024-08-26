import React from "react";
import {
  ColorValue,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
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

type ButtonSize = "large" | "extra-large";
type ButtonTheme = "primary" | "secondary";

export interface IButtonProps {
  size: ButtonSize;
  theme: ButtonTheme;
  text: string;
  marginTop?: number;
  marginBottom?: number;
  onPress(event?: GestureResponderEvent): void;
}

const getColors = (theme: ButtonTheme): ColorValue[] => {
  switch (theme) {
    case "secondary":
      return [colors.BLUE_PRIMARY, colors.BLUE_PRIMARY];
    case "primary":
    default:
      return [colors.ORANGE_PRIMARY_DARK, colors.ORANGE_PRIMARY_LIGHT];
  }
};
const getSize = (size: ButtonSize) => {
  switch (size) {
    case "extra-large": {
      return "100%";
    }
    case "large":
    default:
      return 300;
  }
};

const Button: React.FC<IButtonProps> = ({
  size,
  theme,
  text,
  marginTop,
  marginBottom,
  onPress,
}) => {
  const linearGradientID = "linGrad";
  const clipGradientID = "clipGrad";
  const buttonColor = getColors(theme);
  const width = getSize(size);

  return (
    <Pressable
      style={StyleSheet.flatten([
        s.container,
        { marginTop, marginBottom, width },
      ])}
      onPress={onPress}
      testID="button-pressable-id"
    >
      <Svg>
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
            <Rect x="0" y="0" width={width} height={50} rx="25" ry="50" />
          </ClipPath>
        </Defs>
        <Rect
          x="0"
          y="0%"
          width={width}
          height={50}
          clipPath={`url(#${clipGradientID})`}
          fill={`url(#${linearGradientID})`}
        />
      </Svg>
      <View style={s.contentContainer}>
        <Text style={s.defaultText}>{text}</Text>
      </View>
    </Pressable>
  );
};

export default Button;
