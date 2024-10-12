import { PublicKey } from "@blowater/nostr-sdk/nostr";
import { Kind0MetaData } from "@satlantis/api-client";
import { satlantisClient } from "src/client/satlantisApi";
import { uploadFile } from "src/client/nostr";
import { createAppAsyncThunk } from "src/store/tools";

export const shouldFetchMyProfile = createAppAsyncThunk(
  "get/myProfile",
  async (
    _,
    {
      dispatch,
      extra: {
        actions: { nostr },
      },
    },
  ) => {
    const myProfile = await satlantisClient.getMyProfile();
    if (myProfile instanceof Error) {
      dispatch(nostr.actions.shouldSetTokenExpired());
      throw myProfile;
    }

    const followedBy = await myProfile.getFollowedBy();
    if (followedBy instanceof Error) {
      throw followedBy;
    }

    const followings = await myProfile.getFollowing();
    if (followings instanceof Error) {
      throw followings;
    }

    const myRoles = await myProfile.getAccountPlaceRoles();
    if (myRoles instanceof Error) {
      throw myRoles;
    }

    const myAccount = await myProfile.getAccount();
    if (myAccount instanceof Error) {
      throw myAccount;
    }

    return { myProfile, followedBy, followings, myRoles, myAccount };
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

export const shouldUpdateInterests = createAppAsyncThunk(
  "post/updateInterests",
  async (interests: string[]) => {
    const response = await satlantisClient.updateMyInterests(interests);
    if (response instanceof Error) {
      throw response;
    }
  },
);

export const shouldUpdateMyProfile = createAppAsyncThunk(
  "put/updateMyProfile",
  async (newData: Partial<Kind0MetaData>, { dispatch, getState }) => {
    const profileData = getState().user.myProfile?.metaData;
    const newProfileData = {
      ...profileData,
      ...newData,
    };
    let imageUrl: URL | undefined;
    if (!!newData.picture) {
      imageUrl = await uploadFile(newData.picture);
      newProfileData.picture = imageUrl.toString();
    }
    const res = await satlantisClient.updateMyProfile(newProfileData);
    if (res instanceof Error) {
      throw res;
    }

    dispatch(shouldFetchMyProfile());
  },
);

export const shouldPostFollowUser = createAppAsyncThunk(
  "post/followUser",
  async (pubkey: string, { dispatch }) => {
    const publicKey = PublicKey.FromHex(pubkey);
    if (publicKey instanceof Error) {
      throw new Error(`Invalid key: ${pubkey}: ${publicKey.cause}`);
    }
    const response = await satlantisClient.followPubkeys([publicKey]);
    if (response instanceof Error) {
      throw response;
    }
    if (response) await dispatch(shouldFetchMyProfile());
  },
);

export const shouldPostUnfollowUser = createAppAsyncThunk(
  "post/unfollowUser",
  async (pubkey: string, { dispatch }) => {
    const publicKey = PublicKey.FromHex(pubkey);
    if (publicKey instanceof Error) {
      throw new Error(`Invalid key: ${pubkey}: ${publicKey.cause}`);
    }
    const response = await satlantisClient.unfollowPubkey(publicKey);
    if (response instanceof Error) {
      throw response;
    }
    if (response) await dispatch(shouldFetchMyProfile());
  },
);
