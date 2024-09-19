import { StyleSheet, StyleProp, TextStyle } from "react-native";

import { fonts, colors, normalizeSize } from "src/theme";

const borderRadius = normalizeSize(16);

export const getInputStyle = (
  hasIcon: boolean,
  customHeight: number | undefined,
  multiline: boolean,
  customWidth: number,
): StyleProp<TextStyle> => {
  console.log("customHeight", customHeight);
  return {
    width: hasIcon ? customWidth : "100%",
    maxHeight: customHeight || "100%",
    borderTopLeftRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
    borderTopRightRadius: hasIcon ? 0 : borderRadius,
    borderBottomRightRadius: hasIcon ? 0 : borderRadius,
    fontSize: fonts[16],
    fontWeight: "regular",
    color: colors.WHITE,
    paddingVertical: multiline ? 8 : 0,
  };
};
export default StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    color: colors.WHITE,
    paddingLeft: normalizeSize(16),
    marginBottom: normalizeSize(8),
    fontSize: fonts[14],
    fontWeight: "regular",
  },
  iconInput: {
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: "100%",
    borderRadius: borderRadius,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
