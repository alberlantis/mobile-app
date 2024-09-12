import { StyleSheet } from "react-native";

import { normalizeSize, colors } from "src/theme";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  active: {
    width: normalizeSize(20),
    height: normalizeSize(1),
    backgroundColor: colors.ORANGE_PRIMARY_LIGHT,
    borderRadius: normalizeSize(200),
  },
  inactive: {
    width: normalizeSize(12),
    height: normalizeSize(1),
    backgroundColor: colors.WHITE,
    borderRadius: normalizeSize(200),
    opacity: 0.5,
  },
});
