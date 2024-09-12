import { StyleSheet } from "react-native";

import { colors, normalizeSize } from "src/theme";

export default StyleSheet.create({
  postImage: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.GRAY_BOLD,
    marginHorizontal: 1,
  },
  postRow: {
    flexDirection: "row",
    marginBottom: normalizeSize(1.4),
  },
});
