import { StyleSheet, Dimensions } from "react-native";

import { colors } from "src/theme";

const { height: screenHeight } = Dimensions.get("window");

export default StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: colors.BLACK_MEDIUM,
  },
  modalContent: {
    backgroundColor: colors.BLACK_2,
    padding: "4%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: screenHeight * 0.75,
  },
});
