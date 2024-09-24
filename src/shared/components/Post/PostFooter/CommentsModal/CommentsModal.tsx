import React, { Fragment, useState } from "react";
import { View, Pressable, ActivityIndicator, FlatList } from "react-native";

import {
  useAppDispatch,
  PostsState,
  useAppSelector,
  UserState,
} from "src/store";
import { colors, normalizeSize } from "src/theme";
import Icon from "src/shared/components/Icon";
import CommentList from "src/shared/components/CommentList";
import UserCard from "src/shared/components/UserCard";
import Input from "src/shared/components/Input";
import BottomModal from "src/shared/wrappers/BottomModal";
import s from "./CommentsModal.style";

interface ICommentsModalProps {
  isVisible: boolean;
  setModalVisible(value: boolean): void;
  post: PostsState.selectors.Posts;
}

const CommentsModal: React.FC<ICommentsModalProps> = ({
  isVisible,
  setModalVisible,
  post,
}) => {
  const dispatch = useAppDispatch();
  const followers = useAppSelector(UserState.selectors.selectUserFollowers);
  const followings = useAppSelector(UserState.selectors.selectUserFollowing);
  const initialUserTagListState = [...(followers || []), ...(followings || [])];
  const [usersTagList, setUsersTagList] = useState(initialUserTagListState);
  const [comment, setComment] = useState("");
  const [isTag, setTag] = useState(false);
  const isPostLoading = useAppSelector(PostsState.selectors.selectPostLoading);
  const isPublishReplyLoading = useAppSelector(
    PostsState.selectors.selectPublishReplyLoading,
  );
  const isLoading = isPostLoading || isPublishReplyLoading;
  const tags = initialUserTagListState
    .map((userTag) => userTag.name || "")
    .filter(Boolean);

  if (!post) return null;

  const handlePublishReply = () => {
    if (isLoading) return;

    dispatch(
      PostsState.thunks.shouldPublishReply({
        post,
        comment,
      }),
    );
    setComment("");
  };

  const handleCommentText = (text: string) => {
    setComment(text);

    const atMatches = text.match(/@\S*$/);
    if (!!atMatches) {
      const afterAt = atMatches[0].substring(1); // Texto después del arroba

      if (afterAt.length === 0) {
        setUsersTagList(initialUserTagListState);
        setTag(true);
      } else {
        const filtered = initialUserTagListState.filter((tag) =>
          (tag.name || "").toLowerCase().includes(afterAt.toLowerCase()),
        );
        setUsersTagList(filtered);
        setTag(filtered.length > 0);
      }
    } else {
      setTag(false);
    }
  };
  const handleTagPress = (tag: string) => {
    const lastAtIndex = comment.lastIndexOf("@");
    const newText = comment.slice(0, lastAtIndex) + `@${tag} `;
    setComment(newText);
    setUsersTagList(initialUserTagListState);
    setTag(false);
  };

  return (
    <BottomModal
      isVisible={isVisible}
      setModalVisible={setModalVisible}
      title="Comments"
      subtitle={`${post.descendants?.length} Comments`}
    >
      <View style={s.modalContentContainer}>
        {isLoading ? (
          <View style={s.loadingContainer}>
            <ActivityIndicator />
          </View>
        ) : (
          <Fragment>
            {isTag ? (
              <FlatList
                style={s.usersTagsListContainer}
                keyExtractor={(item, index) =>
                  `view-post-user-tags-list-${item.id}-${index}`
                }
                data={usersTagList}
                renderItem={({ item }) => (
                  <Pressable onPress={() => handleTagPress(item.name || "")}>
                    <UserCard item={item} pictureSize={32} />
                  </Pressable>
                )}
              />
            ) : (
              <CommentList
                keyExtractor={(item, index) =>
                  `view-post-comments-list-${item.id}-${index}`
                }
                data={post.descendants}
                style={s.modalListContainer}
              />
            )}
            <View style={s.commentBoxContainer}>
              <Input
                value={comment}
                onChangeText={handleCommentText}
                backColor={colors.BLACK_DARK}
                placeholder="Add a comment"
                paddingVertical={7}
                tags={tags}
                multiline
                icon={
                  <Pressable style={s.sendIcon} onPress={handlePublishReply}>
                    <Icon
                      type="Feather"
                      name="send"
                      size={normalizeSize(16)}
                      color={colors.WHITE}
                    />
                  </Pressable>
                }
              />
            </View>
          </Fragment>
        )}
      </View>
    </BottomModal>
  );
};

export default CommentsModal;
