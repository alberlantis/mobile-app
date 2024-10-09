import { PublicKey } from "@blowater/nostr-sdk";

import { createAppAsyncThunk } from "src/store/tools";
import { satlantisClient } from "src/client/satlantisApi";

export const shouldFetchProfile = createAppAsyncThunk(
  "get/profile",
  async (pubkey: string) => {
    const publicKey = PublicKey.FromHex(pubkey);
    if (publicKey instanceof Error) {
      throw new Error(`Invalid key: ${pubkey}: ${publicKey.cause}`);
    }
    const profile = await satlantisClient.getUserProfile(publicKey);
    if (profile instanceof Error) {
      throw profile;
    }

    const followedBy = await profile.getFollowedBy();
    if (followedBy instanceof Error) {
      throw followedBy;
    }

    const followings = await profile.getFollowing();
    if (followings instanceof Error) {
      throw followings;
    }

    const roles = await profile.getAccountPlaceRoles();
    if (roles instanceof Error) {
      throw roles;
    }

    return { profile, followedBy, followings, roles };
  },
);
