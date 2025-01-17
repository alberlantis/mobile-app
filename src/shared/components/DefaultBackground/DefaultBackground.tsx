import React, { Fragment } from "react";
import {
  useWindowDimensions,
  View,
  StyleProp,
  ViewStyle,
  SafeAreaView,
} from "react-native";
import Svg, { Defs, RadialGradient, Stop, Rect } from "react-native-svg";

import KeyboardView from "../../wrappers/KeyboardView";
import colors from "src/theme/colors";
import { background, svgBackground } from "./DefaultBackground.style";

export type BlurPosition = "medium" | "bottom" | "top";
interface IDefaultBackgroundProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  blurPos?: BlurPosition;
  keyboard?: boolean;
}

const getBlurPosition = (position: BlurPosition) => {
  switch (position) {
    case "bottom":
      return "33%";
    case "top":
      return "-33%";
    case "medium":
    default:
      return "0%";
  }
};

const DefaultBackground: React.FC<IDefaultBackgroundProps> = ({
  children,
  style,
  blurPos = "medium",
  keyboard = false,
}) => {
  const { width, height } = useWindowDimensions();
  const radialGradialID = "radGrad";
  const position = getBlurPosition(blurPos);

  return (
    <Fragment>
      <View style={background} />
      <Svg width={width} height={height} style={svgBackground}>
        <Defs>
          <RadialGradient
            id={radialGradialID}
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <Stop offset="0%" stopColor={colors.WHITE} />
            <Stop offset="100%" stopColor={colors.BLACK} />
          </RadialGradient>
        </Defs>
        <Rect
          x="0%"
          y={position}
          width={width}
          height={height}
          fill={`url(#${radialGradialID})`}
        />
      </Svg>
      <KeyboardView scrollEnabled={keyboard}>
        <SafeAreaView style={style}>{children}</SafeAreaView>
      </KeyboardView>
    </Fragment>
  );
};

export default DefaultBackground;
