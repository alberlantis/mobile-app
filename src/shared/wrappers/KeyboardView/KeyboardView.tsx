import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

import s from "./KeyboardView.style";

interface IKeyboardViewProps {
  children: React.ReactNode;
}

const KeyboardView: React.FC<IKeyboardViewProps> = ({ children }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={s.keyboardContainer}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardView;
