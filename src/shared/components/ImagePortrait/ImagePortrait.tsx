import React from "react";
import { Image } from "react-native";

import { useAppSelector, UserState } from "src/store";
import s from "./ImagePortrait.style";

const ImagePortrait = () => {
  const { banner } = useAppSelector(UserState.selectors.selectUserHomeProfile);

  return (
    <Image source={{ uri: banner }} style={s.image} resizeMode="stretch" />
  );
};

export default ImagePortrait;
