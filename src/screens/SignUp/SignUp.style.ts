import { StyleSheet } from "react-native";
import { normalizeSize } from "src/theme";

export default StyleSheet.create({
  container: {
    paddingHorizontal: normalizeSize(8),
    alignItems: "center",
    flex: 1,
  },
  logoContainer: {
    alignItems: "center",
    width: "100%",
    marginBottom: normalizeSize(32),
  },
  inputsContainer: {
    alignItems: "center",
    width: "100%",
    marginBottom: normalizeSize(24),
  },
  buttonContainer: {
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    marginBottom: normalizeSize(60),
  },
  button: {
    marginBottom: normalizeSize(20),
  },
  bottomContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    flexGrow: 1,
    paddingBottom: normalizeSize(8),
  },
  inputs: {
    marginBottom: normalizeSize(16),
  },
  inputPassword: {
    marginBottom: normalizeSize(8),
  },
});
