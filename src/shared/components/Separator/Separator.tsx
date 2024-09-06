import React from "react";
import {
  View,
  Text,
  StyleSheet,
  DimensionValue,
  ColorValue,
} from "react-native";

import s, { getLine, getLabel, getLabelText } from "./Separator.style";
import colors from "src/theme/colors";

interface ISeparatorProps {
  marginVertical?: DimensionValue;
  textColor?: ColorValue;
  labelColor?: ColorValue;
  lineColor?: ColorValue;
  label?: string;
  span?: number;
}

const Separator: React.FC<ISeparatorProps> = ({
  marginVertical,
  textColor = colors.WHITE,
  labelColor = colors.BLACK,
  lineColor = colors.GRAY,
  span = 1,
  label,
}) => {
  return (
    <View style={StyleSheet.compose(s.container, { marginVertical })}>
      <View style={getLine(span, lineColor)} />
      {!!label && (
        <View style={getLabel(labelColor)}>
          <Text style={getLabelText(textColor)}>{label}</Text>
        </View>
      )}
    </View>
  );
};

export default Separator;
