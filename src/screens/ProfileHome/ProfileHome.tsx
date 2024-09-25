import React, { useCallback, useEffect, useMemo } from "react";
import { ListRenderItemInfo, FlatList, ActivityIndicator } from "react-native";

import {
  useAppSelector,
  useAppDispatch,
  PostsState,
  UserState,
} from "src/store";
import s from "./ProfileHome.style";
import ProfileHeader from "./ProfileHeader";
import ProfilePosts from "./ProfilePosts";

const ProfileHome = () => {
  const dispatch = useAppDispatch();
  const { npub } = useAppSelector(UserState.selectors.selectUserPublicKeys);
  const posts = useAppSelector(PostsState.selectors.selectSanitizePosts) || [];
  const isLoading = useAppSelector(PostsState.selectors.selectPostsLoading);

  const handleRenderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<PostsState.selectors.Posts[]>) => (
      <ProfilePosts item={item} index={index} />
    ),
    [],
  );
  const handleRenderLoading = useMemo(
    () =>
      isLoading ? (
        <ActivityIndicator size="large" style={s.loadingIndicator} />
      ) : null,
    [isLoading],
  );

  // todo: questions for albert (i need to filter the notes that ar the actual Posts, for those who are only comments or replies)
  useEffect(() => {
    dispatch(PostsState.thunks.shouldFetchPosts({ npub, page: 1 }));
    dispatch(UserState.thunks.shouldFetchAccount());
  }, [dispatch, npub]);

  return (
    <FlatList
      data={posts}
      keyExtractor={(item, index) => `${item[index]?.id}-row-${index}`}
      ListHeaderComponent={ProfileHeader}
      ListFooterComponent={handleRenderLoading}
      renderItem={handleRenderItem}
      showsVerticalScrollIndicator={false}
      style={s.container}
      contentContainerStyle={s.contentContainer}
      ListFooterComponentStyle={s.listFooter}
    />
  );
};

export default ProfileHome;
