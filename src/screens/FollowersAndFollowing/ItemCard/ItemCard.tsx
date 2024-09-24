import React from "react";
import { View, Text } from "react-native";
import { Account } from "@satlantis/api-client";

import { useAppSelector, UserState, useAppDispatch } from "src/store";
import { Button, Icon, RoundImage } from "src/shared/components";
import { colors, fonts } from "src/theme";
import s from "./ItemCard.style";

interface IItemCardProps {
  showFollowers: boolean;
  item: Account;
}
const ItemCard: React.FC<IItemCardProps> = ({ item, showFollowers }) => {
  const dispatch = useAppDispatch();
  const isBeingFollow = useAppSelector(
    UserState.selectors.selectIsUserFollowingFollower(item.id),
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
  const buttonTheme = isLoading
    ? "disabled"
    : showFollowers && !isBeingFollow
      ? "primary-outline"
      : "off";

  const handleFollowButton = () => {
    if (isLoading) return;
    if (isBeingFollow) {
      dispatch(UserState.thunks.shouldPostUnfollowUser(item.npub))
        .unwrap()
        .then(() => dispatch(UserState.thunks.shouldFetchAccount()));
    } else {
      dispatch(UserState.thunks.shouldPostFollowUser(item.npub))
        .unwrap()
        .then(() => dispatch(UserState.thunks.shouldFetchAccount()));
    }
  };

  return (
    <View style={s.container}>
      <View style={s.innerContainer}>
        <RoundImage image={item.picture} size={32} />
        <View style={s.informationContainer}>
          <View style={s.nameContainer}>
            <Text style={s.name}>{item.name}</Text>
            {!!item.chatMemberships && (
              <Icon
                type="MaterialCommunityIcons"
                size={fonts[16]}
                name="crown"
                color={colors.ORANGE_PRIMARY}
              />
            )}
          </View>
          <Text style={s.job} numberOfLines={2}>
            {item.about}
          </Text>
          <Text style={s.totalFollowers}>{item.followedBy?.length}</Text>
        </View>
      </View>
      <Button
        size="auto"
        text={showFollowers && !isBeingFollow ? "Follow" : "Unfollow"}
        onPress={handleFollowButton}
        theme={buttonTheme}
        paddingVertical={7}
        textStyle={s.buttonText}
        loading={isLoading}
      />
    </View>
  );
};

export default ItemCard;
