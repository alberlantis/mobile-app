import { StyleSheet, Dimensions } from "react-native";

import { colors, normalizeSize } from "src/theme";

const { height: screenHeight } = Dimensions.get("window");

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
    maxHeight: screenHeight * 0.75,
    flex: 1,
  },
});
