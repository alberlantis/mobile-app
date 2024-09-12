import { StyleSheet } from "react-native";

import { colors, normalizeSize } from "src/theme";

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.BLACK },
  headerContainer: { paddingHorizontal: normalizeSize(8) },
  content: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
    paddingHorizontal: normalizeSize(8),
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
    marginBottom: normalizeSize(10),
  },
  retakeIcon: {
    position: "absolute",
    right: 0,
  },
});
