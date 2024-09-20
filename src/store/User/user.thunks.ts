import { PublicKey } from "@blowater/nostr-sdk/nostr";
import { Account } from "@satlantis/api-client";
import { satlantisClient } from "src/client/satlantisApi";
import { createAppAsyncThunk } from "src/store/tools";

export const shouldFetchAccount = createAppAsyncThunk(
  "get/account",
  async (npub: string) => {
    const account = await satlantisClient.getAccount({ npub });
    if (account instanceof Error) {
      throw account;
    }
    return account;
  },
);

export const shouldFetchAllInterests = createAppAsyncThunk(
  "get/interestsPool",
  async () => {
    const interestsPool = await satlantisClient.getInterests();
    if (interestsPool instanceof Error) {
      throw interestsPool;
    }
    return interestsPool;
  },
);

export const shouldPostFollowUser = createAppAsyncThunk(
  "post/followUser",
  async (itemNpub: string) => {
    const pubkeyToFollow = PublicKey.FromString(itemNpub);
    if (pubkeyToFollow instanceof Error) {
      throw pubkeyToFollow;
    }
    const response = await satlantisClient.followPubkeys([pubkeyToFollow]);
    return response;
  },
);

export const shouldPostUnfollowUser = createAppAsyncThunk(
  "post/unfollowUser",
  async (pubKey: string) => {
    const pubkeyToUnfollow = PublicKey.FromString(pubKey);
    if (pubkeyToUnfollow instanceof Error) {
      throw pubkeyToUnfollow;
    }
    const response = await satlantisClient.unfollowPubkey(pubkeyToUnfollow);
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
  async ({ newData, npub }: UpdateAccount, { getState, dispatch }) => {
    const account = getState().regular.user.account;
    if (!account) {
      throw new Error("Error trying to reach your account data");
    }
    const res = await satlantisClient.updateAccount({
      npub: account.npub,
      account: newData,
    });
    if (res instanceof Error) {
      throw res;
    }
    await dispatch(shouldFetchAccount(npub));
  },
);

export const shouldPostFollowPubKeys = createAppAsyncThunk(
  "post/followPubKeys",
  async (pubkeys: string[]) => {
    const validPubkeys = pubkeys.map((pub) => {
      const validKey = PublicKey.FromString(pub);
      if (validKey instanceof Error) {
        throw validKey;
      }
      return validKey;
    });
    const response = await satlantisClient.followPubkeys(validPubkeys);
    return response;
  },
);
