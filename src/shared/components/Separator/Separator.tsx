import React from "react";
import {
  View,
  Text,
  StyleSheet,
  DimensionValue,
  ColorValue,
} from "react-native";

import s, { getLine, getLabelText } from "./Separator.style";
import { colors } from "src/theme";

interface ISeparatorProps {
  marginBottom?: DimensionValue;
  marginTop?: DimensionValue;
  textColor?: ColorValue;
  labelColor?: ColorValue;
  lineColor?: ColorValue;
  label?: string;
  span?: number;
}

const Separator: React.FC<ISeparatorProps> = ({
  marginBottom = 0,
  marginTop = 0,
  textColor = colors.WHITE,
  labelColor = colors.BLACK,
  lineColor = colors.GRAY,
  span = 1,
  label,
}) => {
  return (
    <View
      style={StyleSheet.compose(s.container, {
        marginBottom,
        marginTop,
      })}
    >
      <View style={getLine(span, lineColor)} />
      {!!label && (
        <View style={{ ...s.label, backgroundColor: labelColor }}>
          <Text style={getLabelText(textColor)}>{label}</Text>
        </View>
      )}
    </View>
  );
};

export default Separator;
