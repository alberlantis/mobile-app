import { StyleSheet } from "react-native";

import { colors, normalizeSize } from "src/theme";

export default StyleSheet.create({
  tabContainer: {
    backgroundColor: colors.BLACK,
    borderTopWidth: 0,
    minHeight: normalizeSize(36),
  },
});
