import { StyleSheet } from "react-native";

import { colors, normalizeSize } from "src/theme";

export default StyleSheet.create({
  topHeaderContainer: {
    width: "100%",
    position: "absolute",
    zIndex: 1,
    flexDirection: "row",
    paddingTop: normalizeSize(13),
    paddingLeft: normalizeSize(17),
  },
  shareButton: {
    backgroundColor: colors.BLACK_MEDIUM,
    borderRadius: normalizeSize(38) / 2,
    height: normalizeSize(38),
    width: normalizeSize(38),
    justifyContent: "center",
    alignItems: "center",
    right: 0,
    position: "absolute",
    marginRight: normalizeSize(17),
    marginTop: normalizeSize(13),
  },
});
