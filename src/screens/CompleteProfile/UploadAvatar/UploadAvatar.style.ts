import { StyleSheet } from "react-native";

import { colors, normalizeSize } from "src/theme";

export default StyleSheet.create({
  container: {
    width: normalizeSize(202),
    height: normalizeSize(202),
    borderRadius: normalizeSize(202) / 2,
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.GRAY_2,
    borderStyle: "dashed",
    borderWidth: normalizeSize(2),
  },
  innerContainer: {
    width: normalizeSize(136),
    height: normalizeSize(136),
    borderRadius: normalizeSize(136) / 2,
    backgroundColor: colors.GRAY_2,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonOuterContainer: {
    width: normalizeSize(40),
    height: normalizeSize(40),
    borderRadius: normalizeSize(40) / 2,
    backgroundColor: colors.BLACK_LIGHT,
    position: "absolute",
    bottom: "-15%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonInnerContainer: {
    width: normalizeSize(32),
    height: normalizeSize(32),
    borderRadius: normalizeSize(32) / 2,
    backgroundColor: colors.GRAY_2,
    alignItems: "center",
    justifyContent: "center",
    padding: normalizeSize(6),
  },
});
