import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

import { EXPO_PUBLIC_DOMAIN } from "src/shared/constants/env";
import { SCREENS } from "src/navigation/routes";
import { SignedScreenProps } from "src/navigation/SignedStack";
import { useAppSelector, PostsState, useAppDispatch } from "src/store";
import { colors } from "src/theme";
import { Header, Post } from "src/shared/components";
import { KeyboardView } from "src/shared/wrappers";
import s from "./ViewPost.style";

const ViewPost: React.FC<SignedScreenProps<typeof SCREENS.VIEW_POST>> = ({
  route,
}) => {
  const dispatch = useAppDispatch();
  const { postId } = route.params;
  const post = useAppSelector(PostsState.selectors.selectPost);
  const isLoading = useAppSelector(PostsState.selectors.selectPostLoading);
  const isPostLikeLoading = useAppSelector(
    PostsState.selectors.selectLikingPostLoading,
  );
  const isPublishReplyLoading = useAppSelector(
    PostsState.selectors.selectPublishReplyLoading,
  );
  const isLoadingPostChanges = isPostLikeLoading || isPublishReplyLoading;

  useEffect(() => {
    dispatch(PostsState.thunks.shouldFetchPost(postId));
  }, [dispatch, postId]);

  if (!post || (isLoading && !isLoadingPostChanges)) {
    return (
      <View style={s.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <KeyboardView>
      <View style={s.container}>
        <View style={s.headerContainer}>
          <Header
            backButtonColor={colors.GRAY_BOLD}
            showSharedButton
            shareButtonColor={colors.GRAY_BOLD}
            shareValue={`${EXPO_PUBLIC_DOMAIN}/p/${post.itself.account.npub}?note=${post.itself.id}`}
          />
        </View>
        <Post post={post} />
      </View>
    </KeyboardView>
  );
};

export default ViewPost;
