import { StyleSheet } from "react-native";

import { colors, fonts, normalizeSize } from "src/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: normalizeSize(8),
  },
  emailIconContainer: {
    width: normalizeSize(64),
    height: normalizeSize(64),
    backgroundColor: colors.BLACK_TRANSPARENT,
    borderRadius: normalizeSize(16),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: normalizeSize(24),
    marginTop: normalizeSize(54),
  },
  emailRecoveryDescription: {
    fontSize: fonts[14],
    color: colors.WHITE_BOLD,
    textAlign: "center",
    width: "75%",
    marginVertical: normalizeSize(24),
  },
  input: {
    marginTop: normalizeSize(24),
  },
  button: {
    marginTop: normalizeSize(24),
  },
});
