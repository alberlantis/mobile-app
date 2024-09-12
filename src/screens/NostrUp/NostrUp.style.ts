import { StyleSheet } from "react-native";

import { fonts, colors, normalizeSize } from "src/theme";

export default StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: normalizeSize(8),
    flex: 1,
  },
  logoContainer: {
    alignItems: "center",
    width: "100%",
    marginBottom: normalizeSize(32),
  },
  inputContainer: {
    alignItems: "center",
    width: "100%",
    marginBottom: normalizeSize(56),
  },
  buttonContainer: {
    alignItems: "center",
    width: "100%",
  },
  privateKeyContainer: {
    alignItems: "center",
    width: "100%",
    justifyContent: "space-around",
  },
  button: {
    marginBottom: normalizeSize(60),
  },
  bottomContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    paddingBottom: normalizeSize(8),
    flexGrow: 1,
  },
  textDescription: {
    color: colors.WHITE_BOLD,
    textAlign: "center",
    fontSize: fonts[14],
    marginBottom: normalizeSize(12),
  },
  nsecKeyContainer: {
    width: "100%",
    backgroundColor: colors.GRAY_LIGHT,
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: normalizeSize(16),
    paddingVertical: normalizeSize(12),
    paddingHorizontal: normalizeSize(16),
    marginBottom: normalizeSize(56),
  },
  nsecTitle: {
    color: colors.WHITE,
    fontWeight: "bold",
    fontSize: fonts[14],
  },
  nsecKey: {
    color: colors.WHITE_BOLD,
    textAlign: "center",
    fontSize: fonts[14],
    marginVertical: normalizeSize(16),
  },
  copyButton: { color: colors.WHITE_BOLD, marginLeft: normalizeSize(12) },
});
