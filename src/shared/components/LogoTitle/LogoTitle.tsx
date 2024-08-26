import React from "react";
import { Image, Text, View, Platform, StyleSheet } from "react-native";

import { useImageAssets } from "src/shared/hooks";
import s from "./LogoTitle.style";

interface ILogoTitleProps {
  title: string;
}

const LogoTitle: React.FC<ILogoTitleProps> = ({ title }) => {
  const { images } = useImageAssets();

  return (
    <View
      testID="logo-title-container-id"
      style={StyleSheet.compose(s.container, {
        marginTop: Platform.OS === "android" ? 56 : 0,
      })}
    >
      <Image
        source={images.logo}
        style={s.image}
        testID="logo-title-image-id"
      />
      <Text style={s.title}>{title}</Text>
    </View>
  );
};

export default LogoTitle;
