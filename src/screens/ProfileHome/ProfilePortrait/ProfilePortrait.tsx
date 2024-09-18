import React, { Fragment } from "react";
import { View } from "react-native";

import { ProfileState, useAppSelector } from "src/store";
import { BackButton, ImagePortrait, ShareButton } from "src/shared/components";
import { colors } from "src/theme";
import s from "./ProfilePortrait.style";

const ProfilePortrait = () => {
  const isOwnProfile = useAppSelector(
    ProfileState.selectors.selectIsOwnProfile,
  );

  return (
    <Fragment>
      <View style={s.topHeaderContainer}>
        {isOwnProfile && <BackButton color={colors.BLACK_MEDIUM} />}
        <View style={s.shareButton}>
          <ShareButton />
        </View>
      </View>
      <ImagePortrait />
    </Fragment>
  );
};

export default ProfilePortrait;
