import React, { Fragment, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useRoute } from "@react-navigation/native";

import {
  useAppSelector,
  PostsState,
  UserState,
  useAppDispatch,
} from "src/store";
import { SignedRouteProps } from "src/navigation/SignedStack";
import { colors, normalizeSize } from "src/theme";
import ExpandableText from "src/shared/components/ExpandableText";
import Icon from "src/shared/components/Icon";
import s from "./PostFooter.style";
import PostActionItem from "./PostActionItem";
import LikesModal from "./LikesModal";
import CommentsModal from "./CommentsModal";
import type { PostsScreens } from "../Post";
import LikesText from "./LikesText";

const PostFooter = () => {
  const dispatch = useAppDispatch();
  const route = useRoute<SignedRouteProps<PostsScreens>>();
  const { postId } = route.params;
  const account = useAppSelector(UserState.selectors.selectMyAccount);
  const [showLikesModal, setShowLikesModal] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const openCommentsModal = () => {
    setShowCommentsModal(true);
  };
  const post = useAppSelector(PostsState.selectors.selectSinglePost(postId));
  const isPostLoading = useAppSelector(PostsState.selectors.selectPostsLoading);
  const isPostLikeLoading = useAppSelector(
    PostsState.selectors.selectLikingPostLoading,
  );
  const isLoading = isPostLikeLoading || isPostLoading;
  const [totalLikes, setTotalLikes] = useState(post!.reactions.length || 0);
  const isUserLikePost = useAppSelector(
    PostsState.selectors.selectIsUserLikePost(account?.id, postId),
  );
  const [like, setLike] = useState(isUserLikePost);

  const handleLikePost = () => {
    if (isLoading || !post || isUserLikePost) return;
    dispatch(PostsState.thunks.shouldLikePosts(post))
      .unwrap()
      .then(() => dispatch(UserState.thunks.shouldFetchAccount()));
    setLike(!like);
    setTotalLikes(totalLikes + 1);
  };

  if (!post) return null;

  return (
    <Fragment>
      <View style={s.postDescriptionContainer}>
        <ExpandableText text={post.description} numOfLines={6} />
        <View style={s.postActionsContainer}>
          <PostActionItem
            icon={{
              type: "FontAwesome",
              name: like ? "heart" : "heart-o",
            }}
            setIconAction={handleLikePost}
            setTextAction={() => setShowLikesModal(true)}
            text={totalLikes.toString()}
          />
          <PostActionItem
            icon={{
              type: "FontAwesome",
              name: !!post.descendants.length ? "comment" : "comment-o",
            }}
            text={post.descendants.length.toString()}
            style={s.commentAction}
            setIconAction={openCommentsModal}
            setTextAction={openCommentsModal}
          />
        </View>
        <LikesText totalLikes={totalLikes} reactions={post.reactions} />
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
        totalLikes={totalLikes.toString()}
      />
      <CommentsModal
        isVisible={showCommentsModal}
        setModalVisible={setShowCommentsModal}
        post={post}
      />
    </Fragment>
  );
};

export default PostFooter;
