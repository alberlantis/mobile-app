import { StyleSheet } from "react-native";

import { normalizeSize, colors, fonts } from "src/theme";

export default StyleSheet.create({
  container: {
    paddingHorizontal: normalizeSize(8),
    alignItems: "center",
    flex: 1,
  },
  logoContainer: {
    alignItems: "center",
    width: "100%",
    marginBottom: normalizeSize(24),
  },
  inputContainer: {
    alignItems: "center",
    width: "100%",
    marginBottom: normalizeSize(24),
  },
  buttonContainer: {
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-start",
  },
  textDescription: {
    color: colors.WHITE_BOLD,
    textAlign: "center",
    fontSize: fonts[14],
    marginTop: normalizeSize(24),
  },
});
