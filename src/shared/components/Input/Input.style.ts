import { StyleSheet, StyleProp, TextStyle } from "react-native";

import { fonts, colors, normalizeSize } from "src/theme";

const borderRadius = normalizeSize(16);

export const getInputStyle = (
  hasIcon: boolean,
  customHeight: number | undefined,
  multiline: boolean,
  customWidth: number,
  useTag: boolean,
): StyleProp<TextStyle> => {
  return {
    width: hasIcon ? customWidth : "100%",
    maxHeight: customHeight || "100%",
    borderTopLeftRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
    borderTopRightRadius: hasIcon ? 0 : borderRadius,
    borderBottomRightRadius: hasIcon ? 0 : borderRadius,
    fontSize: fonts[16],
    fontWeight: "regular",
    color: useTag ? colors.TRANSPARENT : colors.WHITE,
    position: useTag ? "absolute" : "relative",
    zIndex: useTag ? 1 : 0,
    alignSelf: "center",
    marginLeft: useTag ? normalizeSize(16) : 0,
    paddingVertical: multiline && !useTag ? normalizeSize(8) : 0,
  };
};

export const getCustomTextStyle = (
  hasIcon: boolean,
  hasValue: boolean,
  customWidth: number,
): StyleProp<TextStyle> => ({
  width: hasIcon ? customWidth : "100%",
  alignItems: "center",
  textAlignVertical: "center",
  justifyContent: "center",
  color: hasValue ? colors.WHITE : colors.WHITE_LIGHT,
  fontSize: fonts[16],
  fontWeight: "regular",
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
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: "100%",
    borderRadius: borderRadius,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
