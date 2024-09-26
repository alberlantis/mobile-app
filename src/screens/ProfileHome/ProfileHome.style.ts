import { StyleSheet } from "react-native";

import colors from "src/theme/colors";

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
  loadingIndicator: {
    height: "100%",
  },
});
