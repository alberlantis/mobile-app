import { StyleSheet } from "react-native";

import { colors, normalizeSize } from "src/theme";

export default StyleSheet.create({
  allFiltersButtonContainer: {
    width: normalizeSize(52),
    height: normalizeSize(52),
    backgroundColor: colors.BLACK_GREY,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalizeSize(16),
    marginLeft: normalizeSize(12),
  },
  filterModalContainer: {
    paddingHorizontal: normalizeSize(16),
  },
  modalSaveButton: {
    flex: 1,
    justifyContent: "center",
    padding: normalizeSize(16),
  },
});
