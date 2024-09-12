import { StyleSheet } from "react-native";

import { colors, fonts, normalizeSize } from "src/theme";

export default StyleSheet.create({
  container: {
    paddingHorizontal: normalizeSize(8),
    alignItems: "center",
    flex: 1,
  },
  headerContainer: {
    width: "100%",
    alignItems: "center",
  },
  textDescription: {
    color: colors.WHITE_BOLD,
    textAlign: "center",
    fontSize: fonts[14],
    marginTop: normalizeSize(12),
    width: "90%",
  },
  optionsListContainer: {
    width: "100%",
    marginTop: normalizeSize(47),
    marginBottom: normalizeSize(67),
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "flex-end",
    flexGrow: 1,
    paddingBottom: normalizeSize(8),
  },
  buttomMargin: {
    marginBottom: normalizeSize(32),
  },
});
