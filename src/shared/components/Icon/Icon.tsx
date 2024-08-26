import React from "react";
import { Entypo, Feather } from "@expo/vector-icons";
import { ColorValue, StyleProp, TextStyle } from "react-native";

import colors from "src/theme/colors";

export type IconNames = {
  Entypo: keyof typeof Entypo.glyphMap;
  Feather: keyof typeof Feather.glyphMap;
};

interface IBaseIconProps {
  size?: number;
  color?: ColorValue;
  style?: StyleProp<TextStyle>;
}

export type IconProps<T extends keyof IconNames> = IBaseIconProps & {
  type: T;
  name: IconNames[T];
};

const Icon = <T extends keyof IconNames>({
  type,
  name,
  size = 24,
  color = colors.BLACK,
  style,
}: IconProps<T>) => {
  const iconMap = {
    Entypo,
    Feather,
  };
  const IconComponent = iconMap[type] as React.ComponentType<any>;
  return <IconComponent name={name} size={size} color={color} style={style} />;
};

export default Icon;
