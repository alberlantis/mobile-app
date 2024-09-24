import React, { Fragment } from "react";
import { View } from "react-native";

import { colors } from "src/theme";
import { ImagePortrait, Header } from "src/shared/components";
import s from "./ProfilePortrait.style";

const ProfilePortrait = () => {
  const isOwnProfile = true; // will be recieved an accountId from route and equal to own account id

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
