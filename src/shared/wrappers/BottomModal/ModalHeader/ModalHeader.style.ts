import { StyleSheet } from "react-native";

import { colors, fonts, normalizeSize } from "src/theme";

export default StyleSheet.create({
  modalHeader: {
    flexDirection: "row",
    justifyContent: "center",
    padding: normalizeSize(16),
    marginBottom: normalizeSize(20),
    borderBottomColor: colors.BLACK_6,
    borderBottomWidth: normalizeSize(1),
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
});
