import { useState } from "react";

import { useAppSelector, UserState, useAppDispatch } from "src/store";

const useFollowButton = (userId: number) => {
  const dispatch = useAppDispatch();
  const [userPressed, setUserPressed] = useState<number | undefined>();
  const isFollowUserLoading = useAppSelector(
    UserState.selectors.selectFollowUserLoading,
  );
  const isUnfollowUserLoading = useAppSelector(
    UserState.selectors.selectUnfollowUserLoading,
  );
  const isFetchProfileLoading = useAppSelector(
    UserState.selectors.selectMyProfileLoading,
  );

  const isLoading =
    (isFollowUserLoading || isUnfollowUserLoading || isFetchProfileLoading) &&
    userPressed === userId;

  const handleFollowButton = (
    userPressedId: number,
    isBeingFollow: boolean,
    itemPubkey: string,
  ) => {
    setUserPressed(userPressedId);
    if (isLoading) return;
    if (isBeingFollow) {
      dispatch(UserState.thunks.shouldPostUnfollowUser(itemPubkey))
        .unwrap()
        .then(() => dispatch(UserState.thunks.shouldFetchMyProfile()));
    } else {
      dispatch(UserState.thunks.shouldPostFollowUser(itemPubkey))
        .unwrap()
        .then(() => dispatch(UserState.thunks.shouldFetchMyProfile()));
    }
  };

  return { isLoading, handleFollowButton };
};

export default useFollowButton;
