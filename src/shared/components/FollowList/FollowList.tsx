import React from "react";
import { FlatList, StyleProp, ViewStyle } from "react-native";
import { Account } from "@satlantis/api-client";

import UserCard from "../UserCard";
import s from "./FollowList.style";

interface IFollowListProps {
  showFollowers?: boolean;
  listHeader?(): React.JSX.Element;
  style?: StyleProp<ViewStyle>;
  isFollowItem?: boolean;
  data: Account[];
  keyExtractor(item: Account, index: number): string;
  onPress(item: Account): void;
}

const FollowList: React.FC<IFollowListProps> = ({
  showFollowers = true,
  listHeader,
  keyExtractor,
  style = s.container,
  data,
  isFollowItem = true,
  onPress,
}) => {
  return (
    <FlatList
      style={style}
      keyExtractor={keyExtractor}
      data={data}
      renderItem={({ item }) => (
        <UserCard
          item={item}
          showFollowers={showFollowers}
          isFollowItem={isFollowItem}
          pictureSize={32}
          onPress={onPress}
        />
      )}
      ListHeaderComponent={listHeader}
    />
  );
};

export default FollowList;
