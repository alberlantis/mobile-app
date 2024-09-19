import { StyleSheet } from "react-native";

import { colors, normalizeSize } from "src/theme";

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.BLACK },
  itemContainer: { marginBottom: normalizeSize(24) },
});
