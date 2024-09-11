import { StyleSheet, Dimensions } from "react-native";

import { imageHeight } from "src/shared/components/ImagePortrait";
import colors from "src/theme/colors";

const { height: screenHeight } = Dimensions.get("window");
const headerHeight = imageHeight * 0.4;

export default StyleSheet.create({
  container: {
    backgroundColor: colors.BLACK,
    flex: 1,
  },
  topHeaderContainer: {
    width: "100%",
    alignItems: "center",
    position: "absolute",
    zIndex: 1,
    flexDirection: "row",
    paddingVertical: "2%",
    height: headerHeight,
    paddingLeft: "2%",
  },
  mainInfoContainer: {
    width: "100%",
    flexDirection: "row",
  },
  mainBasePanelContainer: {
    width: "70%",
    padding: "2%",
  },
  aboutSection: { margin: "2%" },
  contactSection: { marginHorizontal: "2%" },
  buttonContainer: {
    justifyContent: "flex-end",
    marginHorizontal: "2%",
    height: screenHeight * 0.15,
  },
});
