import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
  contentContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  defaultText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "medium",
  },
});
