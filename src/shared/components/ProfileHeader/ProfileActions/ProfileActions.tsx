import React from "react";
import { View } from "react-native";

import { UserState, useAppDispatch, useAppSelector } from "src/store";
import Button from "src/shared/components/Button";
import Icon from "src/shared/components/Icon";
import s from "./ProfileActions.style";
import { fonts, colors } from "src/theme";

interface IProfileActionsProps {
  isOwnProfile: boolean;
  pubkey: string;
  userId: number;
}

const ProfileActions: React.FC<IProfileActionsProps> = ({
  isOwnProfile,
  pubkey,
  userId,
}) => {
  const dispatch = useAppDispatch();
  const isBeingFollow = useAppSelector(
    UserState.selectors.selectIsUserFollowingFollower(userId),
  );

  const isFollowUserLoading = useAppSelector(
    UserState.selectors.selectFollowUserLoading,
  );
  const isUnfollowUserLoading = useAppSelector(
    UserState.selectors.selectUnfollowUserLoading,
  );
  const isLoading = isFollowUserLoading || isUnfollowUserLoading;

  const handleFollowButton = () => {
    if (isLoading) return;
    if (isBeingFollow) {
      dispatch(UserState.thunks.shouldPostUnfollowUser(pubkey))
        .unwrap()
        .then(() => dispatch(UserState.thunks.shouldFetchMyProfile()));
    } else {
      dispatch(UserState.thunks.shouldPostFollowUser(pubkey))
        .unwrap()
        .then(() => dispatch(UserState.thunks.shouldFetchMyProfile()));
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
