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
    paddingVertical: normalizeSize(16),
  },
  filterButtonText: {
    fontSize: fonts[12],
    fontWeight: fonts.medium,
    marginRight: normalizeSize(4),
    textAlign: "center",
    textTransform: "capitalize",
  },
  modalCheckboxItemContainer: {
    paddingVertical: normalizeSize(18),
    paddingHorizontal: normalizeSize(16),
  },
  modalSaveButton: {
    padding: normalizeSize(16),
    flexDirection: "row",
  },
  saveButtonContainer: {
    flex: 1,
  },
  clearSubFilterButtonContainer: { marginRight: normalizeSize(8) },
});
