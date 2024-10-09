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
  },
  headerRightSection: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  actionMenuContainer: {
    borderRadius: normalizeSize(38) / 2,
    height: normalizeSize(38),
    width: normalizeSize(38),
    justifyContent: "center",
    alignItems: "center",
    marginLeft: normalizeSize(8),
  },
});
