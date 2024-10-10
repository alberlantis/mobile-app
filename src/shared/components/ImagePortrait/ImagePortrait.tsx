import React from "react";
import { Image, ImageURISource, ImageSourcePropType } from "react-native";

import s from "./ImagePortrait.style";

interface IImagePortraitProps {
  imageBanner: ImageSourcePropType;
  defaultBanner: ImageURISource;
}

const ImagePortrait: React.FC<IImagePortraitProps> = ({
  defaultBanner,
  imageBanner,
}) => {
  return (
    <Image
      defaultSource={defaultBanner}
      resizeMethod="scale"
      source={imageBanner}
      style={s.image}
      resizeMode="cover"
    />
  );
};

export default ImagePortrait;
