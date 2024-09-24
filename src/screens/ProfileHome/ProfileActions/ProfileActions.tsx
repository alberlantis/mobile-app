import React, { useState } from "react";
import { View } from "react-native";

import { Button, Icon } from "src/shared/components";
import s from "./ProfileActions.style";
import { fonts, colors } from "src/theme";

const ProfileActions = () => {
  const [toggleFollow, setToggleFollow] = useState(false);
  const isOwnProfile = true; // will be recieved an accountId from route and equal to own account id

  const followIcon = () => (
    <Icon
      type={toggleFollow ? "MaterialCommunityIcons" : "Entypo"}
      style={s.followingIconCheck}
      name={toggleFollow ? "check-bold" : "plus"}
      color={colors.WHITE}
      size={fonts[18]}
    />
  );

  return !isOwnProfile ? (
    <View style={s.container}>
      <View style={s.followingButtonContainer}>
        <Button
          size="auto"
          text={toggleFollow ? "Following" : "Follow"}
          theme="primary"
          paddingVertical={8.5}
          prefixElement={followIcon}
          onPress={() => setToggleFollow(!toggleFollow)}
        />
      </View>
    </View>
  ) : null;
};

export default ProfileActions;
