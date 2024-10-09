import React, { useState, useMemo } from "react";

import { SCREENS } from "src/navigation/routes";
import { SignedScreenProps } from "src/navigation/SignedStack";
import { FollowList } from "src/shared/components";
import ListHeader from "./ListHeader";
import { useAppSelector, UserState } from "src/store";

const FollowersAndFollowing: React.FC<
  SignedScreenProps<typeof SCREENS.FOLLOWERS_AND_FOLLOWING>
> = ({ navigation }) => {
  const [showFollowers, setShowFollowers] = useState(true);
  const account = useAppSelector(UserState.selectors.selectMyAccount);
  const followers = useMemo(() => account?.followedBy || [], [account]);
  const followings = useMemo(() => account?.following || [], [account]);

  return (
    <FollowList
      data={showFollowers ? followers : followings}
      keyExtractor={(item, index) =>
        `${showFollowers ? "followers" : "following"}-list-${item?.id}-${index}`
      }
      listHeader={() => (
        <ListHeader
          name={account?.name || ""}
          showFollowers={showFollowers}
          setShowFollowers={setShowFollowers}
          totalFollowers={account?.followedBy.length || 0}
          totalFollowings={account?.following.length || 0}
        />
      )}
      onPress={(item) =>
        navigation.push(SCREENS.OTHER_PROFILE, {
          profilePubkey: item.pubKey || "",
          userId: item.id || NaN,
        })
      }
      isFollowItem
      showFollowers={showFollowers}
    />
  );
};

export default FollowersAndFollowing;
