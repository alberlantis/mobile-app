import { PublicKey } from "@blowater/nostr-sdk";

import { createAppAsyncThunk } from "src/store/tools";
import { satlantisClient } from "src/client/satlantisApi";

export const shouldFetchProfile = createAppAsyncThunk(
  "get/profile",
  async (pubkey: string) => {
    const publicKey = PublicKey.FromHex(pubkey);
    if (publicKey instanceof Error) {
      throw publicKey;
    }

    const response = await satlantisClient.getUserProfile(publicKey);
    if (response instanceof Error) {
      throw response;
    }

    return response;
  },
);
