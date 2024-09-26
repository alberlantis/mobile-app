import React, { useCallback, useMemo } from "react";
import {
  ListRenderItemInfo,
  FlatList,
  ActivityIndicator,
  View,
} from "react-native";
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
  const isAccountLoading = useAppSelector(
    UserState.selectors.selectGetAccountLoading,
  );
  const profileNpub = route.params?.profileNpub;
  const isLoading = isPostLoading || isAccountLoading;

  const handleRenderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<PostsState.selectors.Posts[]>) => (
      <ProfilePosts item={item} index={index} />
    ),
    [],
  );
  const handleRenderLoading = useMemo(
    () =>
      isPostLoading ? (
        <ActivityIndicator size="large" style={s.loadingIndicator} />
      ) : null,
    [isPostLoading],
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(
        PostsState.thunks.shouldFetchPosts({
          npub: profileNpub || npub,
          page: 1,
        }),
      );
      dispatch(UserState.thunks.shouldFetchAccount(profileNpub));
    }, [dispatch, npub, profileNpub]),
  );

  if (isLoading) {
    return (
      <View style={s.loadingContainer}>
        <ActivityIndicator size="small" />
      </View>
    );
  }

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
