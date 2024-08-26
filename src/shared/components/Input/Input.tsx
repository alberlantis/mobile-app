import React, { useState } from "react";
import { TextInput, Text, View, Pressable, StyleSheet } from "react-native";

import colors from "src/theme/colors";
import Icon from "../Icon";
import s from "./Input.style";

/**
 * @tech
 *
 * Unit-Test
 */

type InputType = "username" | "password" | "emailAddress";

interface IInputProps {
  label?: string;
  value: string;
  onChangeText(value: string): void;
  placeholder?: string;
  marginBottom?: number;
  marginTop?: number;
  type?: InputType;
}

const Input: React.FC<IInputProps> = ({
  label,
  value,
  onChangeText,
  marginBottom,
  placeholder,
  marginTop,
  type,
}) => {
  const isPassword = type === "password";
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const [isSecure, setIsSecure] = useState(isPassword);

  return (
    <View style={StyleSheet.compose(s.container, { marginBottom, marginTop })}>
      {!!label && <Text style={s.label}>{label}</Text>}
      <View style={s.inputContainer}>
        <TextInput
          style={s.input}
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
          secureTextEntry={isSecure}
        />
        {isPassword && (
          <Pressable
            disabled={!value}
            onPress={() => setIsSecure(!isSecure)}
            style={s.icon}
          >
            <Icon
              type="Feather"
              name={isSecure ? "eye" : "eye-off"}
              color={value ? colors.WHITE : colors.WHITE_LIGHT}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default Input;
