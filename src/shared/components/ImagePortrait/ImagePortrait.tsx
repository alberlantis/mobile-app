import React from "react";
import { Image } from "react-native";

import { useImageAssets } from "src/shared/hooks";
import { useAppSelector, UserState } from "src/store";
import s from "./ImagePortrait.style";

interface IImagePortraitProps {
  isOwnProfile: boolean;
}

const ImagePortrait: React.FC<IImagePortraitProps> = ({ isOwnProfile }) => {
  const { banner } = useAppSelector(
    UserState.selectors.selectUserHomeProfile(isOwnProfile),
  );
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
