import React from "react";
import { View } from "react-native";
import { useRoute } from "@react-navigation/native";

import { UserState, useAppDispatch, useAppSelector } from "src/store";
import { SCREENS } from "src/navigation/routes";
import type { SignedRouteProps } from "src/navigation/SignedStack";
import type { ProfileHomeRoutes } from "src/screens/ProfileHome/ProfileHome";
import { Button, Icon } from "src/shared/components";
import s from "./ProfileActions.style";
import { fonts, colors } from "src/theme";

const ProfileActions: React.FC = () => {
  const dispatch = useAppDispatch();
  const route = useRoute<SignedRouteProps<ProfileHomeRoutes>>();
  const isOwnProfile = route.name === SCREENS.PROFILE_HOME;
  const profileAccount = useAppSelector(
    UserState.selectors.selectOtherUserAccount,
  );
  const isBeingFollow = useAppSelector(
    UserState.selectors.selectIsUserFollowingFollower(profileAccount?.id),
  );
  const isFollowUserLoading = useAppSelector(
    UserState.selectors.selectFollowUserLoading,
  );
  const isUnfollowUserLoading = useAppSelector(
    UserState.selectors.selectUnfollowUserLoading,
  );
  const isRefreshingAccount = useAppSelector(
    UserState.selectors.selectGetAccountLoading,
  );
  const isLoading =
    isFollowUserLoading || isRefreshingAccount || isUnfollowUserLoading;

  const handleFollowButton = () => {
    if (isLoading) return;
    if (isBeingFollow) {
      dispatch(
        UserState.thunks.shouldPostUnfollowUser(
          route.params?.profileNpub || "",
        ),
      )
        .unwrap()
        .then(() => dispatch(UserState.thunks.shouldFetchAccount()));
    } else {
      dispatch(
        UserState.thunks.shouldPostFollowUser(route.params?.profileNpub || ""),
      )
        .unwrap()
        .then(() => dispatch(UserState.thunks.shouldFetchAccount()));
    }
  };
  const followIcon = () => (
    <Icon
      type={isBeingFollow ? "MaterialCommunityIcons" : "Entypo"}
      style={s.followingIconCheck}
      name={isBeingFollow ? "check-bold" : "plus"}
      color={colors.WHITE}
      size={fonts[18]}
    />
  );

  return !isOwnProfile ? (
    <View style={s.container}>
      <View style={s.followingButtonContainer}>
        <Button
          size="auto"
          text={isBeingFollow ? "Following" : "Follow"}
          theme="primary"
          paddingVertical={8.5}
          prefixElement={followIcon}
          onPress={handleFollowButton}
          loading={isLoading}
        />
      </View>
    </View>
  ) : null;
};

export default ProfileActions;
