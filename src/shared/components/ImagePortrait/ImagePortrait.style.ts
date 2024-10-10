import { StyleSheet } from "react-native";
import { colors, normalizeSize } from "src/theme";

export default StyleSheet.create({
  image: {
    width: "100%",
    height: normalizeSize(130),
    backgroundColor: colors.BLACK,
  },
});
