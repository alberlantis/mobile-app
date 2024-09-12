import { StyleSheet } from "react-native";
import { normalizeSize } from "src/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: normalizeSize(8),
  },
  logoContainer: {
    alignItems: "center",
    width: "100%",
    marginBottom: normalizeSize(8),
  },
  inputsContainer: {
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
  buttonContainer: {
    alignItems: "center",
    width: "100%",
    paddingBottom: normalizeSize(8),
  },
  signInButton: {
    marginBottom: normalizeSize(20),
  },
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: normalizeSize(24),
  },
  usernameInput: {
    marginBottom: normalizeSize(16),
  },
  passwordInput: {
    marginBottom: normalizeSize(12),
  },
  separator: {
    marginTop: normalizeSize(20),
    marginBottom: normalizeSize(20),
  },
});
