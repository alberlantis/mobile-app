import React from "react";
import { Image } from "react-native";

import { ProfileState, useAppSelector } from "src/store";
import { useImageAssets } from "src/shared/hooks";
import s from "./ImagePortrait.style";

const ImagePortrait = () => {
  const { images } = useImageAssets();
  const isBusiness = useAppSelector(
    ProfileState.selectors.selectIsProfileBusiness,
  );

  return (
    <Image
      source={
        isBusiness ? images.mockBusinessLandscape : images.mockUserLandscape
      }
      style={s.image}
      resizeMode="stretch"
    />
  );
};

export default ImagePortrait;
