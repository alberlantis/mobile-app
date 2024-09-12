import { StyleSheet } from "react-native";

import { colors, fonts, normalizeSize } from "src/theme";

export default StyleSheet.create({
  modalHeader: {
    flexDirection: "row",
    justifyContent: "center",
    padding: normalizeSize(16),
    marginBottom: normalizeSize(20),
  },
  modalHeaderLeft: { width: "20%" },
  modalHeaderTitle: { width: "60%" },
  modalTitle: {
    fontSize: fonts[20],
    fontWeight: "medium",
    textAlign: "center",
    color: colors.WHITE,
    marginBottom: normalizeSize(2),
  },
  modalSubtitle: {
    fontSize: fonts[12],
    textAlign: "center",
    color: colors.WHITE_BOLD,
  },
  modalHeaderRight: { width: "20%", alignItems: "flex-end" },
  modalHeaderCloseButton: {
    backgroundColor: colors.BLACK_3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalizeSize(38) / 2,
    width: normalizeSize(38),
    height: normalizeSize(38),
  },
});
