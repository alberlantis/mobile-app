import { StyleSheet } from "react-native";

import { normalizeSize } from "src/theme";

export default StyleSheet.create({
  modalCheckboxItemContainer: {
    paddingVertical: normalizeSize(18),
    paddingHorizontal: normalizeSize(16),
  },
  modalSaveButton: {
    padding: normalizeSize(16),
  },
});
