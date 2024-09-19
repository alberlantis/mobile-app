import { StyleSheet } from "react-native";

import { colors, normalizeSize } from "src/theme";

export default StyleSheet.create({
  modalContentContainer: { width: "100%", flex: 1 },
  modalListContainer: {
    paddingHorizontal: normalizeSize(16),
  },
  commentBoxContainer: {
    width: "100%",
    padding: normalizeSize(16),
    borderTopWidth: normalizeSize(1),
    borderTopColor: colors.BLACK_6,
    backgroundColor: colors.BLACK_2,
  },
  sendIcon: {
    width: normalizeSize(36),
    height: normalizeSize(36),
    backgroundColor: colors.ORANGE_SEND_BUTTON,
    borderRadius: normalizeSize(36) / 2,
    marginLeft: normalizeSize(12),
    alignItems: "center",
    justifyContent: "center",
  },
});
