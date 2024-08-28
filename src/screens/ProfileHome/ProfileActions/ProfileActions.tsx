import React, { useState } from "react";
import { View } from "react-native";

import { Icon } from "src/shared/components";
import { Button } from "src/shared/components";
import s from "./ProfileActions.style";
import colors from "src/theme/colors";

const isOwnProfile = true;

const ProfileActions = () => {
  const [toggleFollow, setToggleFollow] = useState(false);
  const setCheckIcon = () => (
    <Icon
      type="MaterialCommunityIcons"
      style={s.followingIconCheck}
      name="check-bold"
      color={colors.WHITE}
    />
  );
  const setEditIcon = () => (
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
            size="regular"
            text="Edit Profile"
            theme="primary"
            marginTop={10}
            marginBottom={10}
            buttonIcon={setEditIcon}
            onPress={() => {}}
          />
        </View>
      ) : (
        <View style={s.followingButtonContainer}>
          <Button
            size="regular"
            text={toggleFollow ? "Following" : "Follow"}
            theme="primary"
            marginTop={10}
            marginBottom={10}
            buttonIcon={toggleFollow ? setCheckIcon : undefined}
            onPress={() => setToggleFollow(!toggleFollow)}
          />
        </View>
      )}
    </View>
  );
};

export default ProfileActions;
