import React, { useState } from "react";
import {
  TextInput,
  Text,
  View,
  ColorValue,
  LayoutChangeEvent,
} from "react-native";

import { colors, normalizeSize } from "src/theme";
import s, { getInputStyle, getCustomTextStyle } from "./Input.style";

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
  tags?: string[];
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
  tags = [],
}) => {
  const isTextArea = type === "text-area";
  const hasIcon = !!icon;
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
  const renderFormattedText = (text: string) => {
    if (!text) return null;
    const parts = text.split(/(@\S*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("@")) {
        const tagMatch = !!tags.find((tag) =>
          tag.toLowerCase().startsWith(part.substring(1).toLowerCase()),
        );
        if (tagMatch) {
          return (
            <Text key={index} style={{ color: colors.ORANGE_PRIMARY_LIGHT }}>
              {part}
            </Text>
          );
        }
      }
      return (
        <Text key={index} style={{ color: colors.WHITE }}>
          {part}
        </Text>
      );
    });
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
          style={getInputStyle(
            hasIcon,
            customHeight,
            multiline,
            customWidth,
            !!tags.length,
          )}
          autoCorrect={false}
          autoCapitalize="none"
          autoComplete="off"
          spellCheck={false}
          placeholder={!!tags.length ? "" : placeholder}
          placeholderTextColor={colors.WHITE_LIGHT}
          underlineColorAndroid={colors.TRANSPARENT}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={type === "password"}
          numberOfLines={numOfLines}
          multiline={multiline}
          textAlignVertical={isTextArea ? "top" : "center"}
        />
        {!!tags.length && (
          <Text style={getCustomTextStyle(hasIcon, !!value, customWidth)}>
            {renderFormattedText(value) || placeholder}
          </Text>
        )}
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
