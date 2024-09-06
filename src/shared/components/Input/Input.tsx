import React, { useState } from "react";
import { TextInput, Text, View, StyleSheet } from "react-native";

import colors from "src/theme/colors";
import s, { getInputContainer, getInputStyle } from "./Input.style";

/**
 * @tech
 *
 * Unit-Test
 */
type InputType = "username" | "password" | "emailAddress" | "none";

interface IInputProps {
  label?: string;
  value: string;
  onChangeText(value: string): void;
  placeholder?: string;
  marginBottom?: number;
  marginTop?: number;
  type?: InputType;
  icon?: React.ComponentElement<any, any>;
  customHeight?: number;
  multiline?: number;
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
  customHeight,
  multiline,
}) => {
  const isTextArea = !!multiline;
  const hasIcon = !!icon;
  const [selection, setSelection] = useState({ start: 0, end: 0 });

  return (
    <View style={StyleSheet.compose(s.container, { marginBottom, marginTop })}>
      {!!label && <Text style={s.label}>{label}</Text>}
      <View style={getInputContainer(customHeight)}>
        <TextInput
          style={getInputStyle(hasIcon, isTextArea)}
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
          textContentType={type}
          secureTextEntry={type === "password"}
          numberOfLines={multiline}
          multiline={isTextArea}
          textAlignVertical={isTextArea ? "top" : "center"}
        />
        {hasIcon && <View style={s.iconInput}>{icon}</View>}
      </View>
    </View>
  );
};

export default Input;
