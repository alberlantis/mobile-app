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
  marginBottom?: DimensionValue;
  marginTop?: DimensionValue;
  textColor?: ColorValue;
  labelColor?: ColorValue;
  lineColor?: ColorValue;
  label?: string;
  span?: number;
  customHeight?: `${number}%` | number;
}

const Separator: React.FC<ISeparatorProps> = ({
  marginBottom = 0,
  marginTop = 0,
  textColor = colors.WHITE,
  labelColor = colors.BLACK,
  lineColor = colors.GRAY,
  span = 1,
  customHeight,
  label,
}) => {
  return (
    <View
      style={StyleSheet.compose(s.container, {
        height: customHeight,
        marginBottom,
        marginTop,
      })}
    >
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
