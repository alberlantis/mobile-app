import { StyleSheet } from "react-native";
import { normalizeSize } from "src/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: normalizeSize(32),
  },
  emailButton: {
    marginBottom: normalizeSize(16),
    marginTop: normalizeSize(32),
  },
  nostrButton: {
    marginBottom: normalizeSize(20),
  },
});
