import { useAppSelector, UserState, useAppDispatch } from "src/store";

const useFollowButton = (userId: number, itemNpub: string) => {
  const dispatch = useAppDispatch();
  const isBeingFollow = useAppSelector(
    UserState.selectors.selectIsUserFollowingFollower(userId),
  );
  const { npub } = useAppSelector(UserState.selectors.selectUserPublicKeys);
  const isFollowUserLoading = useAppSelector(
    UserState.selectors.selectFollowUserLoading,
  );
  const isUnfollowUserLoading = useAppSelector(
    UserState.selectors.selectUnfollowUserLoading,
  );
  const isRefreshingAccount = useAppSelector(
    UserState.selectors.selectGetAccountLoading,
  );
  const isLoading =
    isFollowUserLoading || isRefreshingAccount || isUnfollowUserLoading;

  const handleFollowButton = () => {
    if (isLoading) return;
    if (isBeingFollow) {
      dispatch(UserState.thunks.shouldPostUnfollowUser(itemNpub))
        .unwrap()
        .then(() => dispatch(UserState.thunks.shouldFetchAccount(npub)));
    } else {
      dispatch(UserState.thunks.shouldPostFollowUser(itemNpub))
        .unwrap()
        .then(() => dispatch(UserState.thunks.shouldFetchAccount(npub)));
    }
  };

  return { isLoading, handleFollowButton };
};

export default useFollowButton;
