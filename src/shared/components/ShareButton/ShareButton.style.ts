import { StyleSheet } from "react-native";

import { normalizeSize } from "src/theme";

export default StyleSheet.create({
  container: {
    borderRadius: normalizeSize(38) / 2,
    height: normalizeSize(38),
    width: normalizeSize(38),
    justifyContent: "center",
    alignItems: "center",
  },
});
