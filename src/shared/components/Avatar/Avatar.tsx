import React from "react";
import { Image, View } from "react-native";

import { useAppSelector, UserState } from "src/store";
import Icon from "../Icon";
import s from "./Avatar.style";
import { colors, fonts } from "src/theme";

const Avatar = () => {
  const { avatar } = useAppSelector(UserState.selectors.selectUserHomeProfile);

  return (
    <View style={s.profilePhotoInnerContainer}>
      <Image
        resizeMode="cover"
        source={{ uri: avatar }}
        style={s.profilePhoto}
      />
      <View style={s.profilePhotoCheckIcon}>
        <Icon
          type="Feather"
          size={fonts[16]}
          name="check"
          color={colors.WHITE}
        />
      </View>
    </View>
  );
};

export default Avatar;
