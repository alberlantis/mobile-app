import React from "react";
import { Image } from "react-native";

import { useImageAssets } from "src/shared/hooks";
import s from "./ImagePortrait.style";

interface IImagePortraitProps {
  banner: string;
}

const ImagePortrait: React.FC<IImagePortraitProps> = ({ banner }) => {
  const { images } = useImageAssets();

  return (
    <Image
      defaultSource={images.splash}
      resizeMethod="scale"
      source={banner ? { uri: banner } : undefined}
      style={s.image}
      resizeMode="cover"
    />
  );
};

export default ImagePortrait;
