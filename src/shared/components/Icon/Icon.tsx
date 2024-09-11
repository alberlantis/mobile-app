import React from "react";
import {
  Entypo,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
  Fontisto,
  Octicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { ColorValue, StyleProp, TextStyle } from "react-native";

import colors from "src/theme/colors";

export type IconNames = {
  SimpleLineIcons: keyof typeof SimpleLineIcons.glyphMap;
  Octicons: keyof typeof Octicons.glyphMap;
  AntDesign: keyof typeof AntDesign.glyphMap;
  Entypo: keyof typeof Entypo.glyphMap;
  Feather: keyof typeof Feather.glyphMap;
  FontAwesome: keyof typeof FontAwesome.glyphMap;
  Ionicons: keyof typeof Ionicons.glyphMap;
  MaterialCommunityIcons: keyof typeof MaterialCommunityIcons.glyphMap;
  Fontisto: keyof typeof Fontisto.glyphMap;
};

interface IBaseIconProps {
  size?: number;
  color?: ColorValue;
  style?: StyleProp<TextStyle>;
}

export type IconProps<T extends keyof IconNames> = IBaseIconProps & {
  type: T;
  name: IconNames[T];
  onPress?(): void;
};

export type IconType = keyof IconNames;
export type IconName = IconNames[keyof IconNames];

const Icon = <T extends keyof IconNames>({
  type,
  name,
  size = 24,
  color = colors.BLACK,
  style,
  onPress,
}: IconProps<T>) => {
  const iconMap = {
    Entypo,
    Feather,
    FontAwesome,
    Ionicons,
    MaterialCommunityIcons,
    AntDesign,
    Fontisto,
    Octicons,
    SimpleLineIcons,
  };
  const IconComponent = iconMap[type] as React.ComponentType<any>;
  return (
    <IconComponent
      onPress={onPress}
      name={name}
      size={size}
      color={color}
      style={style}
    />
  );
};

export default Icon;
