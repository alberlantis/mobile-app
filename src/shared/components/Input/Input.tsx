import React, { useState } from "react";
import { TextInput, Text, View } from "react-native";

import colors from "src/theme/colors";
import s, { getInputStyle } from "./Input.style";

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
  multiline?: number;
  customHeight?: number;
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
  multiline,
  customHeight,
}) => {
  const isTextArea = !!multiline;
  const hasIcon = !!icon;
  const [selection, setSelection] = useState({ start: 0, end: 0 });

  return (
    <View style={{ ...s.container, marginBottom, marginTop }}>
      {!!label && <Text style={s.label}>{label}</Text>}
      <View style={s.inputContainer}>
        <TextInput
          style={getInputStyle(hasIcon, isTextArea, customHeight)}
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
