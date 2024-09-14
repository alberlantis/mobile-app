import { Account } from "@satlantis/api-client/sdk";
import { createAppAsyncThunk } from "src/store/tools";

export const shouldFetchAccount = createAppAsyncThunk(
  "get/account",
  async (
    npub: string,
    {
      extra: {
        api: { UserClient },
      },
    },
  ) => {
    const account = UserClient.getAccount(npub);
    return account;
  },
);

export const shouldFetchAllInterests = createAppAsyncThunk(
  "get/interestsPool",
  async (
    ...[
      ,
      {
        extra: {
          api: { UserClient },
        },
      },
    ]
  ) => {
    const interestsPool = await UserClient.getInterestsPool();
    return interestsPool;
  },
);

type FollowingIdentifiers = {
  followerNpub: string;
  pubKey: string;
};

export const shouldPostFollowUser = createAppAsyncThunk(
  "post/followUser",
  async (
    { pubKey, followerNpub }: FollowingIdentifiers,
    {
      extra: {
        api: { UserClient },
      },
    },
  ) => {
    const response = await UserClient.postFollowUser(followerNpub, pubKey);
    return response;
  },
);

export const shouldPostUnfollowUser = createAppAsyncThunk(
  "post/unfollowUser",
  async (
    { pubKey, followerNpub }: FollowingIdentifiers,
    {
      extra: {
        api: { UserClient },
      },
    },
  ) => {
    const response = await UserClient.postUnfollowUser(followerNpub, pubKey);
    return response;
  },
);

type UpdateAccount = {
  newData: Partial<Account>;
  avatarUri: string;
  npub: string;
};
export const shouldPutUpdateAccount = createAppAsyncThunk(
  "put/updateAccount",
  async (
    { newData, npub, avatarUri }: UpdateAccount,
    {
      extra: {
        api: { UserClient, UploadClient },
      },
      getState,
      dispatch,
    },
  ) => {
    const account = getState().regular.user.account;
    if (!account) {
      throw new Error("Error trying to reach your account data");
    }
    const imageUrl = await UploadClient.uploadImage(avatarUri);
    await UserClient.postUpdateAccount(
      {
        ...account,
        ...newData,
        picture: imageUrl,
      },
      npub,
    );
    await dispatch(shouldFetchAccount(npub));
  },
);
