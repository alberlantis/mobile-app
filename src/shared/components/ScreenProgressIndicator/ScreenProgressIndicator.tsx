import React from "react";
import { View, StyleSheet } from "react-native";

import s from "./ScreenProgressIndicator.style";

interface IScreenProgressIndicatorProps {
  numOfIndicators?: number;
  active?: number;
  screenName: string;
}

const ScreenProgressIndicator: React.FC<IScreenProgressIndicatorProps> = ({
  numOfIndicators = 3,
  active = 1,
  screenName,
}) => {
  const indicators = new Array(numOfIndicators).fill(undefined);

  return (
    <View style={s.container}>
      {indicators.map((...[, index]) => {
        const style = index + 1 === active ? s.active : s.inactive;
        const isLast = index - 1 === indicators.length;
        return (
          <View
            key={`${screenName}-indicator-${index}`}
            style={StyleSheet.compose(style, { marginRight: isLast ? 0 : 5 })}
          />
        );
      })}
    </View>
  );
};

export default ScreenProgressIndicator;
