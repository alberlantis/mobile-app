import { StyleSheet } from "react-native";

import { colors, normalizeSize } from "src/theme";

export default StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: colors.BLACK_MEDIUM,
  },
  modalContent: {
    backgroundColor: colors.BLACK_2,
    borderTopLeftRadius: normalizeSize(16),
    borderTopRightRadius: normalizeSize(16),
    flex: 1,
  },
});
