import React, { Fragment } from "react";
import { View } from "react-native";
import { useRoute } from "@react-navigation/native";

import { SCREENS } from "src/navigation/routes";
import type { ProfileHomeRoutes } from "../ProfileHome";
import type { SignedRouteProps } from "src/navigation/SignedStack";
import { colors } from "src/theme";
import { ImagePortrait, Header } from "src/shared/components";
import { EXPO_PUBLIC_DOMAIN } from "src/shared/constants/env";
import s from "./ProfilePortrait.style";
import { useAppSelector, UserState } from "src/store";

const ProfilePortrait = () => {
  const route = useRoute<SignedRouteProps<ProfileHomeRoutes>>();
  const isOwnProfile = route.name === SCREENS.PROFILE_HOME;
  const account = useAppSelector(
    UserState.selectors.selectAccount(isOwnProfile),
  );

  return (
    <Fragment>
      <View style={s.topHeaderContainer}>
        <Header
          hideBackButton={isOwnProfile}
          backButtonColor={colors.BLACK_MEDIUM}
          showSharedButton
          shareValue={`${EXPO_PUBLIC_DOMAIN}/p/${account?.npub}`}
        />
      </View>
      <ImagePortrait isOwnProfile={isOwnProfile} />
    </Fragment>
  );
};

export default ProfilePortrait;
