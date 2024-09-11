import React, { useState } from "react";
import { View } from "react-native";

import { ProfileState, useAppSelector } from "src/store";
import { Button, Separator, Icon } from "src/shared/components";
import s from "./ProfileActions.style";
import colors from "src/theme/colors";

const ProfileActions = () => {
  const [toggleFollow, setToggleFollow] = useState(false);
  const isOwnProfile = useAppSelector(
    ProfileState.selectors.selectIsOwnProfile,
  );

  const followIcon = () => (
    <Icon
      type={toggleFollow ? "MaterialCommunityIcons" : "Entypo"}
      style={s.followingIconCheck}
      name={toggleFollow ? "check-bold" : "plus"}
      color={colors.WHITE}
    />
  );

  return !isOwnProfile ? (
    <>
      <View style={s.container}>
        <View style={s.followingButtonContainer}>
          <Button
            size="auto"
            text={toggleFollow ? "Following" : "Follow"}
            extraPadding={20}
            theme="primary"
            prefixElement={followIcon}
            onPress={() => setToggleFollow(!toggleFollow)}
          />
        </View>
      </View>
      <Separator span={2} marginBottom="2%" marginTop="2%" />
    </>
  ) : null;
};

export default ProfileActions;
