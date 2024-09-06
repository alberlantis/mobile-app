import React from "react";
import { Image, View } from "react-native";

import { useImageAssets } from "src/shared/hooks";
import Title from "../Title";
import s from "./LogoTitle.style";

interface ILogoTitleProps {
  title: string;
}

const LogoTitle: React.FC<ILogoTitleProps> = ({ title }) => {
  const { images } = useImageAssets();

  return (
    <View testID="logo-title-container-id" style={s.container}>
      <Image
        source={images.logo}
        style={s.image}
        testID="logo-title-image-id"
      />
      <Title title={title} />
    </View>
  );
};

export default LogoTitle;
