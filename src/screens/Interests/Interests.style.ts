import { StyleSheet } from "react-native";

import colors from "src/theme/colors";

export default StyleSheet.create({
  container: {
    marginHorizontal: 10,
    alignItems: "center",
    flex: 1,
  },
  textDescription: {
    color: colors.WHITE_BOLD,
    textAlign: "center",
    fontSize: 14,
    marginTop: 14,
  },
  listContainer: {
    width: "100%",
    paddingVertical: 20,
    marginBottom: 15,
    justifyContent: "center",
  },
  rowContainer: {
    flexDirection: "row",
  },
  interestItem: {
    borderRadius: 100,
    borderCurve: "circular",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedIcon: {
    backgroundColor: colors.BLACK,
    position: "absolute",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    top: 5,
    right: 5,
  },
});
