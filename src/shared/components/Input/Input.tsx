import React, { useState } from "react";
import {
  TextInput,
  Text,
  View,
  ColorValue,
  LayoutChangeEvent,
} from "react-native";

import { colors, normalizeSize } from "src/theme";
import s, { getInputStyle } from "./Input.style";

/**
 * @tech
 *
 * Unit-Test
 */
type InputType =
  | "username"
  | "password"
  | "emailAddress"
  | "none"
  | "text-area";

interface IInputProps {
  label?: string;
  value: string;
  onChangeText(value: string): void;
  placeholder?: string;
  marginBottom?: number;
  marginTop?: number;
  type?: InputType;
  icon?: React.ComponentElement<any, any>;
  multiline?: boolean;
  numOfLines?: number;
  customHeight?: number;
  backColor?: ColorValue;
  paddingVertical?: number;
  paddingHorizontal?: number;
}

const Input: React.FC<IInputProps> = ({
  label,
  value,
  onChangeText,
  marginBottom,
  placeholder,
  marginTop,
  type,
  icon,
  multiline = false,
  customHeight,
  paddingVertical = 16,
  paddingHorizontal = 16,
  numOfLines = 1,
  backColor = colors.BLACK_INPUT,
}) => {
  const isTextArea = type === "text-area";
  const hasIcon = !!icon;
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const [iconWidth, setIconWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const customWidth =
    containerWidth - iconWidth - normalizeSize(paddingHorizontal) * 2;
  const handleIconLayout = (e: LayoutChangeEvent) => {
    if (!!iconWidth) return;
    setIconWidth(e.nativeEvent.layout.width);
  };
  const handleContainerLayout = (e: LayoutChangeEvent) => {
    if (!!containerWidth) return;
    setContainerWidth(e.nativeEvent.layout.width);
  };

  return (
    <View
      onLayout={handleContainerLayout}
      style={{ ...s.container, marginBottom, marginTop }}
    >
      {!!label && <Text style={s.label}>{label}</Text>}
      <View
        style={[
          s.inputContainer,
          {
            backgroundColor: backColor,
            paddingVertical: normalizeSize(paddingVertical),
            paddingHorizontal: normalizeSize(paddingHorizontal),
          },
        ]}
      >
        <TextInput
          style={getInputStyle(hasIcon, customHeight, multiline, customWidth)}
          onSelectionChange={({ nativeEvent: { selection } }) =>
            setSelection({ start: selection.start, end: selection.start })
          }
          autoCorrect={false}
          autoCapitalize="none"
          autoComplete="off"
          spellCheck={false}
          placeholder={placeholder}
          placeholderTextColor={colors.WHITE_LIGHT}
          selection={selection}
          underlineColorAndroid={colors.TRANSPARENT}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={type === "password"}
          numberOfLines={numOfLines}
          multiline={multiline}
          textAlignVertical={isTextArea ? "top" : "center"}
        />
        {hasIcon && (
          <View onLayout={handleIconLayout} style={s.iconInput}>
            {icon}
          </View>
        )}
      </View>
    </View>
  );
};

export default Input;
