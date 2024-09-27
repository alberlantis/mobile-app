import React, { useCallback, useMemo, useState } from "react";
import { ListRenderItemInfo, FlatList, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { SignedScreenProps } from "src/navigation/SignedStack";
import { SCREENS } from "src/navigation/routes";
import {
  useAppSelector,
  useAppDispatch,
  PostsState,
  UserState,
} from "src/store";
import s from "./ProfileHome.style";
import ProfileHeader from "./ProfileHeader";
import ProfilePosts from "./ProfilePosts";

export type ProfileHomeRoutes =
  | typeof SCREENS.PROFILE_HOME
  | typeof SCREENS.OTHER_PROFILE;

const ProfileHome: React.FC<SignedScreenProps<ProfileHomeRoutes>> = ({
  route,
}) => {
  const dispatch = useAppDispatch();
  const { npub } = useAppSelector(UserState.selectors.selectUserPublicKeys);
  const posts = useAppSelector(PostsState.selectors.selectSanitizePosts) || [];
  const isPostLoading = useAppSelector(PostsState.selectors.selectPostsLoading);
  const profileNpub = route.params?.profileNpub;
  const [page, setPage] = useState<number>(0);

  const handleRenderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<PostsState.selectors.Posts[]>) => (
      <ProfilePosts item={item} index={index} />
    ),
    [],
  );
  const handleRenderLoading = useMemo(
    () => (isPostLoading ? <ActivityIndicator size="small" /> : null),
    [isPostLoading],
  );

  const handleOnEndReached = () => {
    if (!isPostLoading) {
      const nextPage = page + 1;
      dispatch(
        PostsState.thunks.shouldFetchPosts({
          npub: profileNpub || npub,
          page: nextPage,
        }),
      );
      setPage(nextPage);
    }
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(PostsState.actions.shouldClearPosts());
      dispatch(UserState.thunks.shouldFetchAccount(profileNpub));
      dispatch(
        PostsState.thunks.shouldFetchPosts({
          npub: profileNpub || npub,
          page: 1,
        }),
      );
      setPage(1);
    }, [dispatch, setPage, npub, profileNpub]),
  );

  return (
    <FlatList
      data={posts}
      keyExtractor={(item, index) => `${item[index]?.id}-row-${index}`}
      ListHeaderComponent={ProfileHeader}
      ListFooterComponent={handleRenderLoading}
      renderItem={handleRenderItem}
      onEndReached={handleOnEndReached}
      onEndReachedThreshold={0.5}
      showsVerticalScrollIndicator={false}
      style={s.container}
      contentContainerStyle={s.contentContainer}
    />
  );
};

export default ProfileHome;
