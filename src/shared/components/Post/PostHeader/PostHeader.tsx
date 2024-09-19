import React from "react";
import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";

import { useAppSelector, UserState } from "src/store";
import { colors, fonts } from "src/theme";
import RoundImage from "src/shared/components/RoundImage";
import Icon from "src/shared/components/Icon";
import ActionMenu from "src/shared/components/ActionMenu";
import usePostMenuOptions from "./usePostMenuOptions";
import s from "./PostHeader.style";

const PostHeader = () => {
  const route = useRoute();
  const { avatar } = useAppSelector(UserState.selectors.selectUserHomeProfile);
  const menuOptions = usePostMenuOptions();

  return (
    <View style={s.headerProfileInfoContainer}>
      <View style={s.avatarNameContainer}>
        <RoundImage image={avatar} size={38} />
        <Text style={s.nameText}>Satina</Text>
        <Text style={s.timePost}>2h</Text>
      </View>
      <View style={s.locationMenuButtonContainer}>
        <Icon
          type="Ionicons"
          size={fonts[16]}
          name="location-sharp"
          color={colors.WHITE_BOLD}
        />
        <Text style={s.locationText}>Funchal</Text>
        <ActionMenu options={menuOptions} screen={route.name} />
      </View>
    </View>
  );
};

export default PostHeader;
