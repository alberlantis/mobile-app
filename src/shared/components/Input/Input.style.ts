import { StyleSheet } from "react-native";

import colors from "src/theme/colors";

export default StyleSheet.create({
  container: {
    width: "100%",
  },
  inputContainer: {
    width: "100%",
    height: 50,
    backgroundColor: colors.BLACK_INPUT,
    borderRadius: 20,
    flexDirection: "row",
  },
  label: {
    color: colors.WHITE,
    paddingLeft: 15,
    marginBottom: 10,
    fontSize: 14,
    fontWeight: "regular",
  },
  icon: {
    height: "100%",
    width: "15%",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "85%",
    height: "100%",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    fontSize: 16,
    fontWeight: "regular",
    paddingHorizontal: 15,
    color: colors.WHITE,
  },
});
