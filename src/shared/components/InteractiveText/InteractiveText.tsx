import React from "react";
import {
  ColorValue,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";

import colors from "src/theme/colors";
import s from "./InteractiveText.style";

interface IInteractiveTextProps {
  prefix: string;
  text?: string;
  color?: ColorValue;
  prefixColor?: ColorValue;
  marginBottom?: number;
  onPress(event?: GestureResponderEvent): void;
}

const InteractiveText: React.FC<IInteractiveTextProps> = ({
  prefix,
  prefixColor = colors.WHITE_BOLD,
  text,
  color = colors.WHITE,
  marginBottom,
  onPress,
}) => {
  return (
    <Text
      style={StyleSheet.compose(s.container, {
        color: prefixColor,
        marginBottom,
      })}
      onPress={onPress}
    >
      {`${prefix} `}
      <Text style={StyleSheet.compose(s.interactiveText, { color: color })}>
        {text}
      </Text>
    </Text>
  );
};

export default InteractiveText;
