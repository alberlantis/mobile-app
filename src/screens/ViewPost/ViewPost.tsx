import React, { useState } from "react";
import { View, Text, Image, Dimensions } from "react-native";

import { useAppSelector, UserState } from "src/store";
import { colors, fonts, normalizeSize } from "src/theme";
import {
  Header,
  RoundImage,
  Icon,
  ActionMenu,
  ExpandableText,
} from "src/shared/components";
import { useImageAssets } from "src/shared/hooks";
import type { SignedScreenProps } from "src/navigation/SignedStack";
import { KeyboardView } from "src/shared/wrappers";
import { usePostMenuOptions } from "./hooks";
import s from "./ViewPost.style";
import { description } from "./mockData";
import PostActionItem from "./PostActionItem";

const ViewPost: React.FC<SignedScreenProps<"ViewPost">> = ({ route }) => {
  const [like, setLike] = useState(false);
  const { avatar } = useAppSelector(UserState.selectors.selectUserHomeProfile);
  const { images } = useImageAssets();
  const menuOptions = usePostMenuOptions();

  return (
    <KeyboardView>
      <View style={s.container}>
        <View style={s.headerContainer}>
          <Header
            backButtonColor={colors.GRAY_BOLD}
            showSharedButton
            shareButtonColor={colors.GRAY_BOLD}
          />
        </View>
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
        <View>
          <Image
            source={images.mockPost}
            style={{
              width: "100%",
              height: Dimensions.get("window").width,
            }}
            resizeMode="stretch"
          />
        </View>
      </View>
      <View style={s.postDescriptionContainer}>
        <ExpandableText text={description} numOfLines={6} />
        <View style={s.postActionsContainer}>
          <PostActionItem
            icon={{
              type: "FontAwesome",
              name: like ? "heart" : "heart-o",
            }}
            setAction={setLike}
            value={like}
            text="201"
          />
          <PostActionItem
            icon={{
              type: "FontAwesome",
              name: "comment-o",
            }}
            text="201"
            style={s.commentAction}
          />
        </View>
        <View style={s.postFollowersLikeContainer}>
          <RoundImage image={images.mockUserAvatar} size={18} />
          <Text style={s.postFollowersLikesText}>
            Liked by <Text style={s.lastFollowerName}>Jefferson</Text> and 8
            others you know
          </Text>
        </View>
        <View style={s.addCommentContainer}>
          <Icon
            type="FontAwesome"
            name="comment-o"
            size={normalizeSize(16)}
            color={colors.GRAY_3}
          />
          <Text style={s.addCommentPlaceholder}>Add comment</Text>
        </View>
      </View>
    </KeyboardView>
  );
};

export default ViewPost;
