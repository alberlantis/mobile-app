import React from "react";
import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";

import { timeSince } from "src/utils";
// import { colors, fonts } from "src/theme";
import RoundImage from "src/shared/components/RoundImage";
// import Icon from "src/shared/components/Icon";
import ActionMenu from "src/shared/components/ActionMenu";
import usePostMenuOptions from "./usePostMenuOptions";
import s from "./PostHeader.style";

interface IPostHeaderProps {
  picture: string | undefined;
  name: string;
  createdAt: string;
  id: number;
  rawContent: string;
  description: string;
  url: string;
  accountNpub: string;
}

const PostHeader: React.FC<IPostHeaderProps> = ({
  name,
  createdAt,
  id,
  picture,
  rawContent,
  description,
  url,
  accountNpub,
}) => {
  const route = useRoute();
  const menuOptions = usePostMenuOptions({
    url,
    description,
    id,
    rawContent,
    accountNpub,
  });

  return (
    <View style={s.headerProfileInfoContainer}>
      <View style={s.avatarNameContainer}>
        <RoundImage image={picture} size={38} />
        <Text style={s.nameText}>{name}</Text>
        <Text style={s.timePost}>{timeSince(createdAt)}</Text>
      </View>
      <View style={s.locationMenuButtonContainer}>
        {/* <Icon
          type="Ionicons"
          size={fonts[16]}
          name="location-sharp"
          color={colors.WHITE_BOLD}
        />
        <Text style={s.locationText}>Funchal</Text> */}
        <ActionMenu options={menuOptions} screen={route.name} />
      </View>
    </View>
  );
};

export default PostHeader;
