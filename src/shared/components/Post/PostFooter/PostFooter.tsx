import React, { Fragment, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Note, Reaction } from "@satlantis/api-client";

import {
  useAppSelector,
  PostsState,
  UserState,
  useAppDispatch,
} from "src/store";
import { colors, normalizeSize } from "src/theme";
import ExpandableText from "src/shared/components/ExpandableText";
import Icon from "src/shared/components/Icon";
import s from "./PostFooter.style";
import PostActionItem from "./PostActionItem";
import LikesModal from "./LikesModal";
import CommentsModal from "./CommentsModal";
// import LikesText from "./LikesText";

interface IPostFooterProps {
  reactions: Reaction[];
  postId: number;
  pubkey: string;
  postKind: number;
  nostrId: string;
  description: string;
  descendants: Note[];
  rawContent: string;
  postType: number;
  postTags: string;
  createdAt: string;
  postSig: string;
}

const PostFooter: React.FC<IPostFooterProps> = ({
  reactions,
  postId,
  pubkey,
  postKind,
  nostrId,
  description,
  descendants,
  rawContent,
  postType,
  postTags,
  createdAt,
  postSig,
}) => {
  const dispatch = useAppDispatch();
  const [showLikesModal, setShowLikesModal] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const openCommentsModal = () => {
    setShowCommentsModal(true);
  };
  const { id } = useAppSelector(UserState.selectors.selectMyAccount) || {};
  const isPostLikeLoading = useAppSelector(
    PostsState.selectors.selectLikingPostLoading,
  );
  const [totalLikes, setTotalLikes] = useState(reactions.length);
  const isUserLikePost = reactions.some(
    (reaction) => reaction.accountId === id,
  );
  const [like, setLike] = useState(isUserLikePost);

  const handleLikePost = () => {
    if (isPostLikeLoading || isUserLikePost) return;
    dispatch(
      PostsState.thunks.shouldLikePosts({
        postId,
        pubkey,
        postKind,
        nostrId,
      }),
    )
      .unwrap()
      .then(() => dispatch(UserState.thunks.shouldFetchMyProfile()));
    setLike(!like);
    setTotalLikes(totalLikes + 1);
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
            setIconAction={handleLikePost}
            setTextAction={() => setShowLikesModal(true)}
            text={totalLikes.toString()}
            color={like ? colors.ORANGE_PRIMARY_LIGHT : colors.GRAY_3}
          />
          <PostActionItem
            icon={{
              type: "FontAwesome",
              name: !!descendants.length ? "comment" : "comment-o",
            }}
            text={descendants.length.toString()}
            style={s.commentAction}
            setIconAction={openCommentsModal}
            setTextAction={openCommentsModal}
            color={
              !!descendants.length ? colors.ORANGE_PRIMARY_LIGHT : colors.GRAY_3
            }
          />
        </View>
        {/* <LikesText totalLikes={totalLikes} reactions={reactions} /> */}
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
        content={rawContent}
        createdAt={createdAt}
        nostrId={nostrId}
        kind={postKind}
        pubkey={pubkey}
        sig={postSig}
        id={postId}
        type={postType}
        eventTags={JSON.parse(postTags)}
        descendants={descendants}
      />
    </Fragment>
  );
};

export default PostFooter;
