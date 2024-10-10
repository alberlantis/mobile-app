import React, { memo } from "react";
import { View, ActivityIndicator, Text } from "react-native";

import type { LocationListTitles } from "../hooks";
import { colors } from "src/theme";
import s from "./SectionHeader.style";

interface ISectionHeaderProps {
  title: LocationListTitles;
  isItemsRendered: boolean;
  isLoading: boolean;
}

const SectionHeader: React.FC<ISectionHeaderProps> = ({
  title,
  isItemsRendered,
  isLoading,
}) => {
  return isItemsRendered ? (
    <View style={s.sectionHeaderContainer}>
      <Text style={s.sectionHeaderTitle}>{title}</Text>
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={colors.WHITE_BOLD}
          style={s.loadingContainer}
        />
      ) : null}
    </View>
  ) : null;
};

export default memo(SectionHeader);
