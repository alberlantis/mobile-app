import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

import s from "./KeyboardView.style";

interface IKeyboardViewProps {
  children: React.ReactNode;
  scrollEnabled?: boolean;
}

const KeyboardView: React.FC<IKeyboardViewProps> = ({
  children,
  scrollEnabled = true,
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={s.keyboardContainer}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEnabled={scrollEnabled}
        contentContainerStyle={s.contentContainer}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyboardView;
