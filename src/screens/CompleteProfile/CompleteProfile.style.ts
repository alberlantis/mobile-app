import { StyleSheet } from "react-native";

import { fonts, colors, normalizeSize } from "src/theme";

export default StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    paddingHorizontal: normalizeSize(8),
  },
  titleContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: normalizeSize(32),
  },
  titleDescription: {
    color: colors.WHITE_BOLD,
    textAlign: "center",
    fontSize: fonts[16],
    marginTop: normalizeSize(12),
  },
  uploadAvataContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: normalizeSize(24),
  },
  inputsContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: normalizeSize(52),
  },
  input: {
    height: normalizeSize(170),
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonDescriptionText: {
    color: colors.WHITE_BOLD,
    textAlign: "center",
    fontSize: fonts[16],
    marginBottom: normalizeSize(16),
  },
  button: {
    marginBottom: normalizeSize(31),
  },
  bottomContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: normalizeSize(8),
  },
});
