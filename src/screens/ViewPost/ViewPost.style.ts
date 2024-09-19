import { StyleSheet } from "react-native";

import { colors, normalizeSize } from "src/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BLACK,
  },
  headerContainer: {
    paddingHorizontal: normalizeSize(16),
    marginBottom: normalizeSize(8),
  },
});
