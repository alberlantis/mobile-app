import { StyleSheet } from "react-native";

import { normalizeSize } from "src/theme";

export default StyleSheet.create({
  modalContentContainer: { width: "100%", flex: 1 },
  modalListContainer: {
    paddingHorizontal: normalizeSize(16),
  },
});
