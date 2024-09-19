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

interface CompleteProfile extends UpdateAccount {
  uri: string;
}
export const shouldUpdateCompleteProfile = createAppAsyncThunk(
  "update/completeProfile",
  async (
    { uri, ...account }: CompleteProfile,
    {
      dispatch,
      extra: {
        api: { UploadClient },
      },
    },
  ) => {
    const imageUrl = await UploadClient.uploadImage(uri);
    await dispatch(
      shouldPutUpdateAccount({
        newData: {
          ...account.newData,
          picture: imageUrl,
        },
        npub: account.npub,
      }),
    );
  },
);

interface UpdateAccount {
  newData: Partial<Account>;
  npub: string;
}

export const shouldPutUpdateAccount = createAppAsyncThunk(
  "put/updateAccount",
  async (
    { newData, npub }: UpdateAccount,
    {
      extra: {
        api: { UserClient },
      },
      getState,
      dispatch,
    },
  ) => {
    const account = getState().regular.user.account;
    if (!account) {
      throw new Error("Error trying to reach your account data");
    }
    await UserClient.postUpdateAccount(
      {
        ...account,
        ...newData,
      },
      npub,
    );
    await dispatch(shouldFetchAccount(npub));
  },
);

type FollowPubKeys = {
  pubKey: string;
  pubkeys: string[];
};
export const shouldPostFollowPubKeys = createAppAsyncThunk(
  "post/followPubKeys",
  async (
    { pubKey, pubkeys }: FollowPubKeys,
    {
      extra: {
        api: { UserClient },
      },
    },
  ) => {
    const response = await UserClient.postFollowPubKeys(pubKey, pubkeys);
    return response;
  },
);
