import { StyleSheet, Dimensions } from "react-native";

const screenHeight = Dimensions.get("window").height;

export default StyleSheet.create({
  container: {
    marginHorizontal: "2%",
    alignItems: "center",
    flex: 1,
  },
  logoContainer: {
    alignItems: "center",
    width: "100%",
    height: "25%",
  },
  inputsContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    height: "50%",
  },
  buttonContainer: {
    alignItems: "center",
    width: "100%",
    height: "17%",
    justifyContent: "center",
  },
  button: {
    marginBottom: screenHeight * 0.02,
  },
  bottomContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "2%",
  },
});
