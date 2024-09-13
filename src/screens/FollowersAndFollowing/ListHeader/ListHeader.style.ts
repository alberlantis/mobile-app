import { StyleSheet } from "react-native";

import { colors, normalizeSize } from "src/theme";

export default StyleSheet.create({
  headerContainer: { paddingHorizontal: normalizeSize(17) },
  buttonsContainer: {
    width: "100%",
    flexDirection: "row",
    padding: normalizeSize(16),
    borderTopColor: colors.GRAY,
    borderTopWidth: normalizeSize(1),
    borderBottomColor: colors.GRAY,
    borderBottomWidth: normalizeSize(1),
  },
  followersButtonContainer: {
    width: "50%",
    paddingRight: normalizeSize(6),
    justifyContent: "center",
  },
  followingButtonContainer: {
    width: "50%",
    paddingLeft: normalizeSize(6),
  },
});
