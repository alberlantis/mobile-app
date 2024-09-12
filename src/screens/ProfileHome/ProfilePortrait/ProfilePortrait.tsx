import React, { Fragment } from "react";
import { View, Pressable } from "react-native";

import { ProfileState, useAppSelector } from "src/store";
import { Icon, BackButton, ImagePortrait } from "src/shared/components";
import { colors, fonts } from "src/theme";
import s from "./ProfilePortrait.style";

const ProfilePortrait = () => {
  const isOwnProfile = useAppSelector(
    ProfileState.selectors.selectIsOwnProfile,
  );

  return (
    <Fragment>
      <View style={s.topHeaderContainer}>
        {isOwnProfile && <BackButton color={colors.BLACK_MEDIUM} />}
        <Pressable style={s.shareButton}>
          <Icon
            type="Entypo"
            size={fonts[20]}
            name="share-alternative"
            color={colors.WHITE}
          />
        </Pressable>
      </View>
      <ImagePortrait />
    </Fragment>
  );
};

export default ProfilePortrait;
