import { StyleSheet } from "react-native";

import { fonts, normalizeSize } from "src/theme";

export default StyleSheet.create({
  infoLabelDefault: {
    fontSize: fonts[12],
    fontWeight: "medium",
    marginLeft: normalizeSize(8),
  },
});
