import { StyleSheet } from "react-native";
import { normalizeSize } from "src/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: normalizeSize(8),
  },
  titleContainer: {
    paddingTop: normalizeSize(54),
  },
  input: {
    marginTop: normalizeSize(24),
    marginBottom: normalizeSize(16),
  },
  button: {
    marginTop: normalizeSize(24),
  },
});
