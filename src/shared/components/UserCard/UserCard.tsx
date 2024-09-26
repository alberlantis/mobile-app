import React from "react";
import { View, Text, Pressable } from "react-native";
import { Account } from "@satlantis/api-client";

import { useAppSelector, UserState } from "src/store";
import Button from "../Button";
import Icon from "../Icon";
import RoundImage from "../RoundImage";
import { colors, fonts } from "src/theme";
import s from "./UserCard.style";
import { useFollowButton } from "./hooks";

interface IUserCardProps {
  showFollowers?: boolean;
  isFollowItem?: boolean;
  pictureSize: number;
  item: Account;
  onPress(item: Account): void;
}
const UserCard: React.FC<IUserCardProps> = ({
  item,
  showFollowers,
  pictureSize,
  isFollowItem = false,
  onPress,
}) => {
  const { isLoading, handleFollowButton } = useFollowButton(item.id, item.npub);
  const isBeingFollow = useAppSelector(
    UserState.selectors.selectIsUserFollowingFollower(item.id),
  );
  const buttonTheme = isLoading
    ? "disabled"
    : showFollowers && !isBeingFollow
      ? "primary-outline"
      : "off";

  return (
    <View style={s.container}>
      <Pressable style={s.innerContainer} onPress={() => onPress(item)}>
        <RoundImage image={item.picture} size={pictureSize} />
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
          {item.about && (
            <Text style={s.job} numberOfLines={2}>
              {item.about}
            </Text>
          )}
          <Text style={s.totalFollowers}>
            {item.followedBy?.length || 0} Followers
          </Text>
        </View>
      </Pressable>
      {isFollowItem && (
        <Button
          size="auto"
          text={showFollowers && !isBeingFollow ? "Follow" : "Unfollow"}
          onPress={() => handleFollowButton(item.id)}
          theme={buttonTheme}
          paddingVertical={7}
          textStyle={s.buttonText}
          loading={isLoading}
        />
      )}
    </View>
  );
};

export default UserCard;
