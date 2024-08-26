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
  text: string;
  color?: ColorValue;
  onPress(event?: GestureResponderEvent): void;
}

const InteractiveText: React.FC<IInteractiveTextProps> = ({
  prefix,
  text,
  color = colors.WHITE,
  onPress,
}) => {
  return (
    <Text style={StyleSheet.compose(s.container, { color })}>
      {`${prefix} `}
      <Text style={s.interactiveText} onPress={onPress}>
        {text}
      </Text>
    </Text>
  );
};

export default InteractiveText;
