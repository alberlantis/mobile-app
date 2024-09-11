import React, { Children } from "react";
import { View, Text, ViewStyle, StyleProp } from "react-native";

import { Separator } from "src/shared/components";
import s from "./BaseSection.style";

interface IBaseSectionProps {
  customContainer?: StyleProp<ViewStyle>;
  topSeparator?: boolean;
  bottomSeparator?: boolean;
  children: React.ReactNode;
  sectionTitle: string;
}

const BaseSection: React.FC<IBaseSectionProps> = ({
  children,
  customContainer,
  topSeparator = false,
  bottomSeparator = false,
  sectionTitle,
}) => {
  return (
    <View style={customContainer}>
      {topSeparator && <Separator marginBottom="2%" span={2} />}
      <Text style={s.sectionTitle}>{sectionTitle}</Text>
      {Children.toArray(children).reduce(
        (acc, curr, i) =>
          i === 0
            ? [curr]
            : [
                ...[acc],
                <View
                  style={s.sectionSeparator}
                  key={`base-section-separator-${i}`}
                />,
                curr,
              ],
        [],
      )}
      {bottomSeparator && <Separator marginTop="2%" span={2} />}
    </View>
  );
};

export default BaseSection;
