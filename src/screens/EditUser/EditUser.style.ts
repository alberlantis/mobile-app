import { StyleSheet } from "react-native";

import { colors, normalizeSize } from "src/theme";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.BLACK,
    flex: 1,
  },
  topHeaderContainer: {
    width: "100%",
    alignItems: "center",
    position: "absolute",
    zIndex: 1,
    flexDirection: "row",
    paddingTop: normalizeSize(17),
    paddingHorizontal: normalizeSize(17),
  },
  mainInfoContainer: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: normalizeSize(17),
    borderBottomColor: colors.GRAY,
    borderBottomWidth: normalizeSize(1),
  },
  mainBasePanelContainer: {
    flex: 1,
    flexGrow: 1,
    paddingLeft: normalizeSize(16),
    marginTop: normalizeSize(12),
    marginBottom: normalizeSize(22),
  },
  aboutSection: {
    paddingVertical: normalizeSize(12),
    paddingHorizontal: normalizeSize(17),
    borderBottomColor: colors.GRAY,
    borderBottomWidth: normalizeSize(1),
  },
  contactSection: {
    paddingVertical: normalizeSize(12),
    paddingHorizontal: normalizeSize(17),
  },
  buttonContainer: {
    paddingHorizontal: normalizeSize(17),
    marginTop: normalizeSize(26),
  },
});
