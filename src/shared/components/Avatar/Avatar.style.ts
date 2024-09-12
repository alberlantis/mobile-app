import { StyleSheet } from "react-native";

import { colors, normalizeSize } from "src/theme";

export default StyleSheet.create({
  profilePhotoInnerContainer: {
    top: -(normalizeSize(80) / 3),
    width: normalizeSize(80),
    height: normalizeSize(80),
  },
  profilePhoto: {
    width: normalizeSize(80),
    height: normalizeSize(80),
    borderRadius: normalizeSize(80) / 2,
  },
  profilePhotoCheckIcon: {
    backgroundColor: colors.ORANGE_PRIMARY_DARK,
    width: normalizeSize(24),
    height: normalizeSize(24),
    position: "absolute",
    borderRadius: normalizeSize(24) / 2,
    alignItems: "center",
    justifyContent: "center",
    bottom: 0,
    right: 0,
    borderColor: colors.BLACK,
    borderWidth: normalizeSize(1.4),
  },
});
