import { StyleSheet, StyleProp, TextStyle } from "react-native";

import { fonts, colors, normalizeSize } from "src/theme";

const borderRadius = normalizeSize(16);

export const getInputStyle = (
  hasIcon: boolean,
  isTextArea: boolean,
  customHeight: number | undefined,
): StyleProp<TextStyle> => ({
  width: hasIcon ? "90%" : "100%",
  height: customHeight || "100%",
  borderTopLeftRadius: borderRadius,
  borderBottomLeftRadius: borderRadius,
  borderTopRightRadius: hasIcon ? 0 : borderRadius,
  borderBottomRightRadius: hasIcon ? 0 : borderRadius,
  fontSize: fonts[16],
  fontWeight: "regular",
  color: colors.WHITE,
});
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
    width: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: "100%",
    backgroundColor: colors.BLACK_INPUT,
    borderRadius: borderRadius,
    flexDirection: "row",
    padding: normalizeSize(16),
  },
});
