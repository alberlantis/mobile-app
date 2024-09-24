import React from "react";
import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";

import { SignedRouteProps } from "src/navigation/SignedStack";
import { timeSince } from "src/utils";
import { useAppSelector, PostsState } from "src/store";
import { colors, fonts } from "src/theme";
import RoundImage from "src/shared/components/RoundImage";
import Icon from "src/shared/components/Icon";
import ActionMenu from "src/shared/components/ActionMenu";
import usePostMenuOptions from "./usePostMenuOptions";
import s from "./PostHeader.style";
import type { PostsScreens } from "../Post";

const PostHeader: React.FC = () => {
  const route = useRoute<SignedRouteProps<PostsScreens>>();
  const { postId } = route.params;
  const post = useAppSelector(PostsState.selectors.selectSinglePost(postId));
  const menuOptions = usePostMenuOptions();

  if (!post) return null;

  return (
    <View style={s.headerProfileInfoContainer}>
      <View style={s.avatarNameContainer}>
        <RoundImage image={post.account.picture} size={38} />
        <Text style={s.nameText}>{post.account.name}</Text>
        <Text style={s.timePost}>{timeSince(post.createdAt)}</Text>
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
