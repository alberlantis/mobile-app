import { Dimensions, Platform } from "react-native";

const screenWidth = Dimensions.get("window").width;
function responsiveFontSize(size: number) {
  if (Platform.OS === "ios" && Platform.isPad) return size * 1.3;
  return (size * screenWidth) / 375;
}

export default {
  14: responsiveFontSize(14),
  16: responsiveFontSize(16),
  18: responsiveFontSize(18),
  20: responsiveFontSize(20),
  22: responsiveFontSize(22),
  24: responsiveFontSize(24),
  28: responsiveFontSize(28),
};
