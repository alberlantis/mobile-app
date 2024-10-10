import { StyleSheet, ViewStyle, StyleProp } from "react-native";

import { colors, fonts, normalizeSize } from "src/theme";

export const getTagContainer = (
  isFirst: boolean,
  isLast: boolean,
): StyleProp<ViewStyle> => ({
  marginRight: normalizeSize(isLast ? 12 : 8),
  marginLeft: normalizeSize(isFirst ? 12 : 0),
});

export default StyleSheet.create({
  carouselFiltersContainer: {
    borderTopWidth: normalizeSize(1),
    borderBottomWidth: normalizeSize(1),
    borderBottomColor: colors.WHITE_GRAY,
    borderTopColor: colors.WHITE_GRAY,
    alignItems: "center",
    paddingVertical: normalizeSize(16),
  },
  filterButtonText: {
    fontSize: fonts[12],
    fontWeight: fonts.medium,
    marginLeft: normalizeSize(8),
  },
});
