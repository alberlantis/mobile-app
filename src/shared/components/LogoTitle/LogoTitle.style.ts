import { StyleSheet } from "react-native";

import colors from "src/theme/colors";

export default StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: { width: 80, height: 80 },
  title: {
    color: colors.WHITE,
    fontWeight: "bold",
    fontSize: 28,
    marginTop: 10,
  },
});
