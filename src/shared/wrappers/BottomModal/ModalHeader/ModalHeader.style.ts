import { StyleSheet } from "react-native";

import { colors, fonts } from "src/theme";

export default StyleSheet.create({
  modalHeader: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: "5%",
  },
  modalHeaderLeft: { width: "20%" },
  modalHeaderTitle: { width: "60%" },
  modalTitle: {
    fontSize: fonts[20],
    fontWeight: "medium",
    textAlign: "center",
    color: colors.WHITE,
    marginBottom: "2%",
  },
  modalSubtitle: {
    fontSize: fonts[12],
    textAlign: "center",
    color: colors.WHITE_BOLD,
  },
  modalHeaderRight: { width: "20%", alignItems: "flex-end" },
  modalHeaderCloseButton: {
    backgroundColor: colors.BLACK_3,
    padding: "10%",
    borderRadius: 100,
  },
});
