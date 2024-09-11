import React, { useCallback, useEffect, useMemo } from "react";
import { ListRenderItemInfo, FlatList, ActivityIndicator } from "react-native";

import type { SanitizePosts } from "src/store/Profile/profile.selectors";
import { useAppSelector, useAppDispatch } from "src/store";
import { ProfileState } from "src/store";
import s from "./ProfileHome.style";
import ProfileHeader from "./ProfileHeader";
import ProfilePosts from "./ProfilePosts";

const ProfileHome = () => {
  const dispatch = useAppDispatch();
  const posts: SanitizePosts[] =
    useAppSelector(ProfileState.selectors.selectSanitizePosts) || [];
  const postsLoading = useAppSelector(
    ProfileState.selectors.selectProfilePostsLoading,
  );

  const handleRenderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<SanitizePosts>) => (
      <ProfilePosts item={item} index={index} />
    ),
    [],
  );
  const handleRenderLoading = useMemo(
    () =>
      postsLoading ? (
        <ActivityIndicator size="large" style={s.loadingIndicator} />
      ) : null,
    [postsLoading],
  );

  useEffect(() => {
    dispatch(ProfileState.thunks.shouldFetchProfilePosts(1));
  }, [dispatch]);

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
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
