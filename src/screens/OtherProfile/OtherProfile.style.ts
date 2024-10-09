import { StyleSheet } from "react-native";

import { colors, normalizeSize } from "src/theme";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.BLACK,
    flex: 1,
  },
  loadingContainer: {
    backgroundColor: colors.BLACK,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flexGrow: 1,
  },
  listFooter: { flex: 1, justifyContent: "flex-end" },
  pullToRefreshIndicator: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: normalizeSize(10),
  },
});
