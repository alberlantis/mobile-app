import React, { useState } from "react";
import { View } from "react-native";

import { ProfileState, useAppSelector } from "src/store";
import { Icon } from "src/shared/components";
import { Button } from "src/shared/components";
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
  const editIcon = () => (
    <Icon
      type="Entypo"
      size={18}
      style={s.followingIconCheck}
      name="edit"
      color={colors.WHITE}
    />
  );

  return (
    <View style={s.container}>
      {isOwnProfile ? (
        <View style={s.editButtonContainer}>
          <Button
            size="auto"
            text="Edit Profile"
            theme="primary"
            marginTop={10}
            marginBottom={10}
            prefixElement={editIcon}
            onPress={() => {}}
          />
        </View>
      ) : (
        <View style={s.followingButtonContainer}>
          <Button
            size="auto"
            text={toggleFollow ? "Following" : "Follow"}
            extraPadding={20}
            theme="primary"
            marginTop={10}
            marginBottom={10}
            prefixElement={followIcon}
            onPress={() => setToggleFollow(!toggleFollow)}
          />
        </View>
      )}
    </View>
  );
};

export default ProfileActions;
