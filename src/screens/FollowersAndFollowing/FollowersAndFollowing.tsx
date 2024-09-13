import React, { useState } from "react";
import { FlatList } from "react-native";

import { useAppSelector, UserState } from "src/store";
import ListHeader from "./ListHeader";
import ItemCard from "./ItemCard";
import s from "./FollowersAndFollowing.style";

const FollowersAndFollowing = () => {
  const [showFollowers, setShowFollowers] = useState(true);
  const followers =
    useAppSelector(UserState.selectors.selectUserFollowers) || [];
  const followings =
    useAppSelector(UserState.selectors.selectUserFollowers) || [];

  return (
    <FlatList
      style={s.container}
      keyExtractor={(item, index) =>
        `${showFollowers ? "followers" : "following"}-list-${item.id}-${index}`
      }
      data={showFollowers ? followers : followings}
      renderItem={({ item, index }) => (
        <ItemCard
          key={`${showFollowers ? "followers" : "following"}-list-${item.id}-${index}`}
          item={item}
          showFollowers={showFollowers}
        />
      )}
      ListHeaderComponent={() => (
        <ListHeader
          showFollowers={showFollowers}
          setShowFollowers={setShowFollowers}
          totalFollowers={followers.length}
          totalFollowings={followings.length}
        />
      )}
    />
  );
};

export default FollowersAndFollowing;
