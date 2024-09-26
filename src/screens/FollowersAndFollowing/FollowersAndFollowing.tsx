import React, { useState } from "react";

import { SCREENS } from "src/navigation/routes";
import { SignedScreenProps } from "src/navigation/SignedStack";
import { useAppSelector, UserState } from "src/store";
import { FollowList } from "src/shared/components";
import ListHeader from "./ListHeader";

const FollowersAndFollowing: React.FC<
  SignedScreenProps<typeof SCREENS.FOLLOWERS_AND_FOLLOWING>
> = ({ route, navigation }) => {
  const [showFollowers, setShowFollowers] = useState(true);
  const followers =
    useAppSelector(
      UserState.selectors.selectUserFollowers(route.params.isOwnProfile),
    ) || [];
  const followings =
    useAppSelector(
      UserState.selectors.selectUserFollowing(route.params.isOwnProfile),
    ) || [];

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
      onPress={(item) =>
        navigation.push(SCREENS.OTHER_PROFILE, { profileNpub: item.npub })
      }
      isFollowItem={route.params.isOwnProfile}
    />
  );
};

export default FollowersAndFollowing;
