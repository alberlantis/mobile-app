import { StyleSheet, Dimensions, StyleProp, ViewStyle } from "react-native";

const screenHeight = Dimensions.get("window").height;
const itemSize = screenHeight * 0.17;
const secondRowMargin = itemSize / 1.9;

export const getRowContainer = (
  isSecondRow: boolean,
): StyleProp<ViewStyle> => ({
  flexDirection: "row",
  paddingLeft: isSecondRow ? secondRowMargin : 0,
});
export default StyleSheet.create({
  listContainer: {
    width: "100%",
    justifyContent: "center",
  },
});
