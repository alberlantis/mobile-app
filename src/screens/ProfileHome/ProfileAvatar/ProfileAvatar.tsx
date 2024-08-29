import React from "react";
import { Image, View } from "react-native";

import { ProfileState, useAppSelector } from "src/store";
import { Icon } from "src/shared/components";
import { useImageAssets } from "src/shared/hooks";
import s from "./ProfileAvatar.style";
import colors from "src/theme/colors";

const ProfileAvatar = () => {
  const { images } = useImageAssets();
  const isBusiness = useAppSelector(
    ProfileState.selectors.selectIsProfileBusiness,
  );

  return (
    <View style={s.container}>
      <View style={s.profilePhotoInnerContainer}>
        <Image
          resizeMode="cover"
          source={
            isBusiness ? images.mockBusinessAvatar : images.mockUserAvatar
          }
          style={s.profilePhoto}
        />
        <View style={s.profilePhotoCheckIcon}>
          <Icon type="Feather" size={16} name="check" color={colors.WHITE} />
        </View>
      </View>
    </View>
  );
};

export default ProfileAvatar;
