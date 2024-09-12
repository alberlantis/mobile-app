import React from "react";
import { Image, View } from "react-native";

import { ProfileState, useAppSelector } from "src/store";
import Icon from "../Icon";
import { useImageAssets } from "src/shared/hooks";
import s from "./Avatar.style";
import { colors, fonts } from "src/theme";

const Avatar = () => {
  const { images } = useImageAssets();
  const isBusiness = useAppSelector(
    ProfileState.selectors.selectIsProfileBusiness,
  );

  return (
    <View style={s.profilePhotoInnerContainer}>
      <Image
        resizeMode="cover"
        source={isBusiness ? images.mockBusinessAvatar : images.mockUserAvatar}
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
