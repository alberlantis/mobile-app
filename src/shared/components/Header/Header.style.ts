import { StyleSheet } from "react-native";
import { normalizeSize, fonts } from "src/theme";

export default StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: normalizeSize(8),
  },
  title: { fontWeight: "medium", fontSize: fonts[20] },
  headerCenterSection: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
  },
  headerRightSection: {
    alignItems: "flex-end",
  },
});
