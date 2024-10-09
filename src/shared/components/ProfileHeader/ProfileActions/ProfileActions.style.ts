import { StyleSheet } from "react-native";
import { normalizeSize, colors } from "src/theme";

export default StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: normalizeSize(17),
    borderBottomWidth: normalizeSize(1),
    borderBottomColor: colors.GRAY,
    paddingVertical: normalizeSize(12),
  },
  followingButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  followingIconCheck: { marginRight: normalizeSize(12) },
});
