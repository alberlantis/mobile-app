import {
  PublicKey,
  prepareNostrEvent,
  NostrKind,
  SingleRelayConnection,
} from "@blowater/nostr-sdk/nostr";
import { Account } from "@satlantis/api-client";
import { satlantisClient } from "src/client/satlantisApi";
import { createAppAsyncThunk } from "src/store/tools";
import { EXPO_PUBLIC_SATLANTIS_RELAY } from "src/shared/constants/env";

export const shouldFetchAccount = createAppAsyncThunk(
  "get/account",
  async (
    profileNpub: string | undefined,
    {
      getState,
      dispatch,
      extra: {
        actions: { user },
      },
    },
  ) => {
    const npub = profileNpub || getState().regular.user.account?.npub || "";
    const account = await satlantisClient.getAccount({ npub });
    if (account instanceof Error) {
      throw account;
    }

    if (!!profileNpub) dispatch(user.shouldSetOtherUserAccount(account));
    else dispatch(user.shouldSetAccount(account));
  },
);

export const shouldGetMyInterests = createAppAsyncThunk(
  "get/myInterests",
  async (_, { getState }) => {
    const npub = getState().regular.user.account?.npub || "";
    const pubkey = PublicKey.FromBech32(npub);
    if (pubkey instanceof Error) {
      throw pubkey;
    }

    const interests = await satlantisClient.getInterestsOf(pubkey);
    if (interests instanceof Error) {
      throw interests;
    }
    return interests.interests;
  },
);

export const shouldUpdateMyInterests = createAppAsyncThunk(
  "post/myInterests",
  async (interests: string[], { dispatch }) => {
    const signer = await satlantisClient.getNostrSigner();
    if (signer instanceof Error) {
      throw signer;
    }

    const event = await prepareNostrEvent(signer, {
      kind: NostrKind.Interests,
      tags: interests.map((i) => ["t", i]),
      content: "",
    });
    if (event instanceof Error) {
      throw event;
    }

    const relay = SingleRelayConnection.New(EXPO_PUBLIC_SATLANTIS_RELAY);
    if (relay instanceof Error) {
      throw relay;
    }
    const err = await relay.sendEvent(event);
    await relay.close();
    if (err instanceof Error) {
      throw err;
    }
    dispatch(shouldGetMyInterests());
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

type CompleteProfile = {
  uri: string;
  newData: Partial<Account>;
};
export const shouldUpdateCompleteProfile = createAppAsyncThunk(
  "update/completeProfile",
  async ({ uri, newData }: CompleteProfile, { dispatch }) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const filename = uri.split("/").pop() || "";
    const file = new File([blob], filename, { type: blob.type });
    const imageUrl = await satlantisClient.uploadFile({ file });
    if (imageUrl instanceof Error) {
      throw imageUrl;
    }
    await dispatch(
      shouldPutUpdateAccount({
        ...newData,
        picture: imageUrl.toString(),
      }),
    );
  },
);

export const shouldPutUpdateAccount = createAppAsyncThunk(
  "put/updateAccount",
  async (newData: Partial<Account>, { getState, dispatch }) => {
    const account = getState().regular.user.account;
    if (!account) {
      throw new Error("Error trying to reach your account data");
    }
    const res = await satlantisClient.updateMyProfile({ ...newData });
    if (res instanceof Error) {
      throw res;
    }
    await dispatch(shouldFetchAccount());
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
