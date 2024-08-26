import React from "react";
import {
  View,
  Text,
  StyleSheet,
  DimensionValue,
  ColorValue,
} from "react-native";

import s from "./Separator.style";
import colors from "src/theme/colors";

interface ISeparatorProps {
  marginVertical?: DimensionValue;
  textColor?: ColorValue;
  labelColor?: ColorValue;
  lineColor?: ColorValue;
  label?: string;
}

const Separator: React.FC<ISeparatorProps> = ({
  marginVertical,
  textColor = colors.WHITE,
  labelColor = colors.BLACK,
  lineColor = colors.GRAY,
  label,
}) => {
  return (
    <View style={StyleSheet.compose(s.container, { marginVertical })}>
      <View
        style={StyleSheet.compose(s.line, {
          backgroundColor: lineColor,
        })}
      />
      {!!label && (
        <View
          style={StyleSheet.compose(s.label, {
            backgroundColor: labelColor,
          })}
        >
          <Text style={{ color: textColor }}>{label}</Text>
        </View>
      )}
    </View>
  );
};

export default Separator;
