import React, { Fragment } from "react";
import { View } from "react-native";

import { ProfileState, useAppSelector } from "src/store";
import { colors } from "src/theme";
import { ImagePortrait, Header } from "src/shared/components";
import s from "./ProfilePortrait.style";

const ProfilePortrait = () => {
  const isOwnProfile = useAppSelector(
    ProfileState.selectors.selectIsOwnProfile,
  );

  return (
    <Fragment>
      <View style={s.topHeaderContainer}>
        <Header
          hideBackButton={!isOwnProfile}
          backButtonColor={colors.BLACK_MEDIUM}
          showSharedButton
          shareValue="https://profile.info.com"
        />
      </View>
      <ImagePortrait />
    </Fragment>
  );
};

export default ProfilePortrait;
