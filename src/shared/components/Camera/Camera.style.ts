import { StyleSheet } from "react-native";

import colors from "src/theme/colors";

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.BLACK },
  headerContainer: { marginHorizontal: "2%" },
  content: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "absolute",
    bottom: 0,
    marginBottom: "5%",
  },
  retakeIcon: {
    position: "absolute",
    right: 0,
    marginRight: "5%",
  },
});
