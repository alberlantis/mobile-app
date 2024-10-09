import { StyleSheet } from "react-native";
import { normalizeSize } from "src/theme";
export default StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    paddingVertical: normalizeSize(21.5),
  },
});
