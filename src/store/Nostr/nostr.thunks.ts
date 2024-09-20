import { InMemoryAccountContext } from "@blowater/nostr-sdk";

import { satlantisClient, setNostrSigner } from "src/client/satlantisApi";
import { createAppAsyncThunk } from "src/store/tools";

export const shouldGenerateSigner = createAppAsyncThunk(
  "get/generateSigner",
  async (username: string) => {
    const isAvailable =
      await satlantisClient.checkUsernameAvailability(username);
    if (isAvailable instanceof Error) {
      throw isAvailable;
    }
    if (!isAvailable) return;
    const signer = InMemoryAccountContext.Generate();
    setNostrSigner(signer);
    return signer.privateKey.hex;
  },
);
