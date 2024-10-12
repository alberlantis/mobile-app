import { StyleSheet } from "react-native";

import { colors, normalizeSize } from "src/theme";

export default StyleSheet.create({
  profilePhotoInnerContainer: {
    top: -(normalizeSize(80) / 3),
    width: normalizeSize(80),
    height: normalizeSize(80),
  },
  buttonInnerContainer: {
    backgroundColor: colors.GRAY_2,
    width: normalizeSize(32),
    height: normalizeSize(32),
    position: "absolute",
    borderRadius: normalizeSize(32) / 2,
    alignSelf: "center",
    justifyContent: "center",
    bottom: "-15%",
    borderColor: colors.BLACK,
  },
});
