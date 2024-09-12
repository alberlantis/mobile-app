import { StyleSheet } from "react-native";
import { normalizeSize } from "src/theme";

export default StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: normalizeSize(38),
    height: normalizeSize(38),
    borderRadius: normalizeSize(38) / 2,
  },
});
