import { StyleSheet } from "react-native";

import { colors, fonts, normalizeSize } from "src/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  gearIcon: { marginBottom: normalizeSize(36) },
  title: {
    color: colors.WHITE,
    fontWeight: fonts.bold,
    fontSize: normalizeSize(28),
  },
  subtitle: {
    color: colors.WHITE_BOLD,
    fontWeight: fonts.regular,
    fontSize: normalizeSize(14),
    marginVertical: normalizeSize(24),
    textAlign: "center",
  },
});
