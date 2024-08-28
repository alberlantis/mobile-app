import { StyleSheet } from "react-native";

import colors from "src/theme/colors";

export default StyleSheet.create({
  container: {
    backgroundColor: colors.BLACK,
    flex: 1,
  },
  loadingIndicator: {
    flex: 1,
    marginTop: 50,
  },
  postImage: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.GRAY_BOLD,
    marginHorizontal: 1,
  },
  postRow: {
    flexDirection: "row",
    marginVertical: 1,
  },
});
