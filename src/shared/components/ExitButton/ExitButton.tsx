import React from "react";
import { ColorValue, Pressable } from "react-native";

import Icon from "src/shared/components/Icon";
import { fonts, colors, normalizeSize, type FontSize } from "src/theme";

import s from "./ExitButton.style";

interface IExitButtonProps {
  onPress(): void;
  size: number;
  iconSize: FontSize;
  color?: ColorValue;
  iconColor?: ColorValue;
}

const ExitButton: React.FC<IExitButtonProps> = ({
  onPress,
  size,
  iconSize,
  color = colors.BLACK_3,
  iconColor = colors.WHITE,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        s.container,
        {
          borderRadius: normalizeSize(size) / 2,
          width: normalizeSize(size),
          height: normalizeSize(size),
          backgroundColor: color,
        },
      ]}
    >
      <Icon
        type="AntDesign"
        name="close"
        size={fonts[iconSize]}
        color={iconColor}
      />
    </Pressable>
  );
};

export default ExitButton;
