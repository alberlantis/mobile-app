import { StyleSheet } from "react-native";

import { normalizeSize } from "src/theme";

export default StyleSheet.create({
  topHeaderContainer: {
    width: "100%",
    position: "absolute",
    zIndex: 1,
    flexDirection: "row",
    paddingHorizontal: normalizeSize(17),
  },
  shareButton: {
    right: 0,
    position: "absolute",
    marginRight: normalizeSize(17),
    marginTop: normalizeSize(13),
  },
});
