import { createAppAsyncThunk } from "src/store/tools";

export const shouldGenerateSigner = createAppAsyncThunk(
  "get/generateSigner",
  async (
    username: string,
    {
      extra: {
        api: { AuthClient },
      },
    },
  ) => {
    if (!(await AuthClient.getIsUserAvailability(username))) return;
    const signer = AuthClient.generateNewNostrSigner();
    return signer.privateKey.hex;
  },
);
