import React, { useState } from "react";
import { TextInput, Text, View, StyleSheet } from "react-native";

import colors from "src/theme/colors";
import s from "./Input.style";

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
}) => {
  const isPassword = type === "password";
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const hasIcon = !!icon;

  return (
    <View style={StyleSheet.compose(s.container, { marginBottom, marginTop })}>
      {!!label && <Text style={s.label}>{label}</Text>}
      <View style={s.inputContainer}>
        <TextInput
          style={StyleSheet.compose(s.input, {
            width: hasIcon ? "85%" : "100%",
          })}
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
          secureTextEntry={isPassword}
        />
        {icon}
      </View>
    </View>
  );
};

export default Input;
