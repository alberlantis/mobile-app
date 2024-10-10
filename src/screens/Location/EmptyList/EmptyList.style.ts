import { StyleSheet } from "react-native";
import { colors, normalizeSize, fonts } from "src/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.BLACK,
    paddingHorizontal: normalizeSize(16),
  },
  image: {
    width: normalizeSize(200),
    height: normalizeSize(200),
  },
  subtitle: {
    color: colors.WHITE_BOLD,
    fontSize: fonts[14],
  },
  textContainer: {
    textAlign: "center",
  },
  // loadingContainer: {
  //   backgroundColor: colors.BLACK,
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
});
