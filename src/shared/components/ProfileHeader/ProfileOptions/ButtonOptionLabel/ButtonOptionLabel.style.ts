import { StyleSheet } from "react-native";

import { fonts, normalizeSize } from "src/theme";

export default StyleSheet.create({
  infoLabelDefault: {
    fontSize: fonts[14],
    fontWeight: fonts.medium,
    marginLeft: normalizeSize(8),
  },
});
