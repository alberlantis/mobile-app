import React, { Fragment, useCallback, useState } from "react";
import {
  FlatList,
  ActivityIndicator,
  ListRenderItemInfo,
  RefreshControl,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { splitArrayBySize } from "src/utils";
import { SignedScreenProps } from "src/navigation/SignedStack";
import { SCREENS } from "src/navigation/routes";
import { useAppSelector, ProfileState, useAppDispatch } from "src/store";
import { ProfileHeader, ProfilePosts } from "src/shared/components";
import { useFetchPosts, type Post, usePullToRefresh } from "src/shared/hooks";
import s from "./OtherProfile.style";

const OtherProfile: React.FC<
  SignedScreenProps<typeof SCREENS.OTHER_PROFILE>
> = ({ route }) => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);
  const otherProfile = useAppSelector(ProfileState.selectors.selectProfile);
  const isAmbassador = useAppSelector(
    ProfileState.selectors.selectIsAmbassador,
  );
  const isLoading = useAppSelector(ProfileState.selectors.selectProfileLoading);
  const { posts = [], loading: postsLoading } = useFetchPosts(
    otherProfile,
    page,
  );
  const { refreshing, onRefresh } = usePullToRefresh(async () => {
    await dispatch(
      ProfileState.thunks.shouldFetchProfile(route.params.profilePubkey),
    );
  });

  useFocusEffect(
    useCallback(() => {
      dispatch(
        ProfileState.thunks.shouldFetchProfile(route.params.profilePubkey),
      );
    }, [dispatch, route.params.profilePubkey]),
  );

  if (!otherProfile || (isLoading && !refreshing)) {
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
          isOwnProfile={false}
          profile={otherProfile}
          userId={route.params.userId}
          pubkey={route.params.profilePubkey}
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

export default OtherProfile;
