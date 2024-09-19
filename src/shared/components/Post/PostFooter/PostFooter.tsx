import React, { Fragment, useState } from "react";
import { View, Text, Pressable } from "react-native";

import { colors, normalizeSize } from "src/theme";
import RoundImage from "src/shared/components/RoundImage";
import ExpandableText from "src/shared/components/ExpandableText";
import Icon from "src/shared/components/Icon";
import { useImageAssets } from "src/shared/hooks";
import s from "./PostFooter.style";
import { description } from "./mockData";
import PostActionItem from "./PostActionItem";
import LikesModal from "./LikesModal";
import CommentsModal from "./CommentsModal";

const PostFooter = () => {
  const [like, setLike] = useState(false);
  const [showLikesModal, setShowLikesModal] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const { images } = useImageAssets();
  const openCommentsModal = () => {
    setShowCommentsModal(true);
  };

  return (
    <Fragment>
      <View style={s.postDescriptionContainer}>
        <ExpandableText text={description} numOfLines={6} />
        <View style={s.postActionsContainer}>
          <PostActionItem
            icon={{
              type: "FontAwesome",
              name: like ? "heart" : "heart-o",
            }}
            setIconAction={() => setLike(!like)}
            setTextAction={() => setShowLikesModal(true)}
            text="201"
          />
          <PostActionItem
            icon={{
              type: "FontAwesome",
              name: "comment-o",
            }}
            text="201"
            style={s.commentAction}
            setIconAction={openCommentsModal}
            setTextAction={openCommentsModal}
          />
        </View>
        <View style={s.postFollowersLikeContainer}>
          <RoundImage image={images.mockUserAvatar} size={18} />
          <Text style={s.postFollowersLikesText}>
            Liked by <Text style={s.lastFollowerName}>Jefferson</Text> and 8
            others you know
          </Text>
        </View>
        <Pressable
          onPress={() => setShowCommentsModal(true)}
          style={s.addCommentContainer}
        >
          <Icon
            type="FontAwesome"
            name="comment-o"
            size={normalizeSize(16)}
            color={colors.GRAY_3}
          />
          <Text style={s.addCommentPlaceholder}>Add comment</Text>
        </Pressable>
      </View>
      <LikesModal
        isVisible={showLikesModal}
        setModalVisible={setShowLikesModal}
      />
      <CommentsModal
        isVisible={showCommentsModal}
        setModalVisible={setShowCommentsModal}
      />
    </Fragment>
  );
};

export default PostFooter;
