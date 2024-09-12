import { StyleSheet } from "react-native";
import { normalizeSize } from "src/theme";

export default StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: normalizeSize(80),
    height: normalizeSize(80),
    marginBottom: normalizeSize(16),
  },
});
