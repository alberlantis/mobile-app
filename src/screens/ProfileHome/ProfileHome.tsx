import React, { Fragment, useState } from "react";
import {
  FlatList,
  ActivityIndicator,
  ListRenderItemInfo,
  RefreshControl,
} from "react-native";

import { splitArrayBySize } from "src/utils";
import { SignedScreenProps } from "src/navigation/SignedStack";
import { SCREENS } from "src/navigation/routes";
import { useAppSelector, useAppDispatch, UserState } from "src/store";
import { ProfileHeader, ProfilePosts } from "src/shared/components";
import { useFetchPosts, type Post, usePullToRefresh } from "src/shared/hooks";
import s from "./ProfileHome.style";

const ProfileHome: React.FC<
  SignedScreenProps<typeof SCREENS.PROFILE_HOME>
> = () => {
  const dispatch = useAppDispatch();
  const myProfile = useAppSelector(UserState.selectors.selectMyProfile);
  const isAmbassador = useAppSelector(UserState.selectors.selectIsAmbassador);
  const [page, setPage] = useState(0);
  const { posts = [], loading: postsLoading } = useFetchPosts(myProfile, page);
  const { refreshing, onRefresh } = usePullToRefresh(async () => {
    await dispatch(UserState.thunks.shouldFetchMyProfile());
  });

  if (!myProfile) {
    return <ActivityIndicator size="large" style={s.loadingContainer} />;
  }

  const sanitizePosts = splitArrayBySize(posts, 3);
  const renderProfileHeader = () => {
    return (
      <Fragment>
        {refreshing && (
          <ActivityIndicator size="large" style={s.pullToRefreshIndicator} />
        )}
        <ProfileHeader
          isOwnProfile
          profile={myProfile}
          isAmbassador={isAmbassador}
        />
      </Fragment>
    );
  };
  const renderItem = ({ item, index }: ListRenderItemInfo<Post[]>) => (
    <ProfilePosts item={item} index={index} />
  );

  return (
    <FlatList
      data={sanitizePosts}
      keyExtractor={(item, index) => `${item[index]?.id}-row-${index}`}
      ListHeaderComponent={renderProfileHeader}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      style={s.container}
      contentContainerStyle={s.contentContainer}
      onEndReached={() => {
        setPage(page + 1);
      }}
      ListEmptyComponent={
        postsLoading ? <ActivityIndicator style={s.loadingContainer} /> : null
      }
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

export default ProfileHome;
