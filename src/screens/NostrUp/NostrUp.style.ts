import { StyleSheet } from "react-native";

import colors from "src/theme/colors";

export default StyleSheet.create({
  container: {
    marginHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  textDescription: {
    color: colors.WHITE_BOLD,
    textAlign: "center",
    marginTop: 50,
  },
  nsecKeyContainer: {
    backgroundColor: colors.GRAY_LIGHT,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 15,
    marginBottom: 30,
  },
  nsecTitle: { color: colors.WHITE, fontWeight: "semibold" },
  nsecKey: {
    color: colors.WHITE_BOLD,
    textAlign: "center",
    marginVertical: 20,
  },
  copyButton: { color: colors.WHITE_BOLD, marginLeft: 5 },
});
