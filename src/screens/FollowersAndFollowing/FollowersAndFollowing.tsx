import React, { useState } from "react";

import { useAppSelector, UserState } from "src/store";
import { FollowList } from "src/shared/components";
import ListHeader from "./ListHeader";

const FollowersAndFollowing = () => {
  const [showFollowers, setShowFollowers] = useState(true);
  const followers =
    useAppSelector(UserState.selectors.selectUserFollowers) || [];
  const followings =
    useAppSelector(UserState.selectors.selectUserFollowers) || [];

  return (
    <FollowList
      data={showFollowers ? followers : followings}
      keyExtractor={(item, index) =>
        `${showFollowers ? "followers" : "following"}-list-${item.id}-${index}`
      }
      listHeader={() => (
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
