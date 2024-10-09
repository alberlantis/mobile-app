import React, { Fragment, useState } from "react";
import { View, Pressable, ActivityIndicator } from "react-native";
import type { NostrEventTag, Note } from "@satlantis/api-client";

import {
  useAppDispatch,
  PostsState,
  useAppSelector,
  UserState,
} from "src/store";
import { colors, normalizeSize } from "src/theme";
import Icon from "src/shared/components/Icon";
import CommentList from "src/shared/components/CommentList";
import FollowList from "src/shared/components/FollowList";
import Input from "src/shared/components/Input";
import BottomModal from "src/shared/wrappers/BottomModal";
import s from "./CommentsModal.style";

interface ICommentsModalProps {
  isVisible: boolean;
  setModalVisible(value: boolean): void;
  eventTags: NostrEventTag[];
  content: string;
  createdAt: string;
  nostrId: string;
  kind: number;
  pubkey: string;
  sig: string;
  id: number;
  type: PostsState.thunks.NoteType;
  descendants: Note[];
}

const CommentsModal: React.FC<ICommentsModalProps> = ({
  isVisible,
  setModalVisible,
  eventTags,
  content,
  createdAt,
  nostrId,
  kind,
  pubkey,
  sig,
  id,
  type,
  descendants,
}) => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(UserState.selectors.selectMyAccount);
  const followers = account?.followedBy || [];
  const followings = account?.following || [];
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

  const handlePublishReply = () => {
    if (isLoading) return;

    dispatch(
      PostsState.thunks.shouldPublishReply({
        eventTags,
        content,
        createdAt,
        nostrId,
        kind,
        pubkey,
        sig,
        comment,
        id,
        type,
      }),
    );
    setComment("");
  };

  const handleCommentText = (text: string) => {
    setComment(text);

    const atMatches = text.match(/@\S*$/);
    if (!!atMatches) {
      const afterAt = atMatches[0].substring(1);

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
      subtitle={`${descendants?.length} Comments`}
    >
      <View style={s.modalContentContainer}>
        {isLoading ? (
          <View style={s.loadingContainer}>
            <ActivityIndicator />
          </View>
        ) : (
          <Fragment>
            {isTag ? (
              <FollowList
                keyExtractor={(item, index) =>
                  `view-post-user-tags-list-${item.id}-${index}`
                }
                data={usersTagList}
                onPress={(item) => handleTagPress(item.name || "")}
                style={s.usersTagsListContainer}
                isFollowItem={false}
              />
            ) : (
              <CommentList
                keyExtractor={(item, index) =>
                  `view-post-comments-list-${item.id}-${index}`
                }
                data={descendants}
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
