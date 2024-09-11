import React from "react";
import { View, Text, ViewStyle, StyleProp } from "react-native";

import s from "./BasePanelText.style";

interface IBasePanelTextProps {
  customContainer?: StyleProp<ViewStyle>;
  text: string;
}
const BasePanelText: React.FC<IBasePanelTextProps> = ({
  customContainer,
  text,
}) => {
  return (
    <View style={customContainer}>
      <Text style={s.text}>{text}</Text>
    </View>
  );
};

export default BasePanelText;
