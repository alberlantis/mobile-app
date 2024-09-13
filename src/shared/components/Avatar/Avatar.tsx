import React from "react";
import { View } from "react-native";

import { useAppSelector, UserState } from "src/store";
import Icon from "../Icon";
import s from "./Avatar.style";
import { colors, fonts } from "src/theme";
import RoundeImage from "../RoundImage";

const Avatar = () => {
  const { avatar } = useAppSelector(UserState.selectors.selectUserHomeProfile);

  return (
    <View style={s.profilePhotoInnerContainer}>
      <RoundeImage size={80} image={avatar} />
      <View style={s.profilePhotoCheckIcon}>
        <Icon
          type="Feather"
          size={fonts[16]}
          name="check"
          color={colors.WHITE}
        />
      </View>
    </View>
  );
};

export default Avatar;
