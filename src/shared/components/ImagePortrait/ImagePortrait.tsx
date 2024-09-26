import React from "react";
import { Image, View } from "react-native";

import { useAppSelector, UserState } from "src/store";
import s from "./ImagePortrait.style";

interface IImagePortraitProps {
  isOwnProfile: boolean;
}

const ImagePortrait: React.FC<IImagePortraitProps> = ({ isOwnProfile }) => {
  const { banner } = useAppSelector(
    UserState.selectors.selectUserHomeProfile(isOwnProfile),
  );

  return !!banner ? (
    <Image source={{ uri: banner }} style={s.image} resizeMode="stretch" />
  ) : (
    <View style={s.image} />
  );
};

export default ImagePortrait;
