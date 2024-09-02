import { createAppAsyncThunk } from "src/store/tools";

export const shouldGenerateSigner = createAppAsyncThunk(
  "get/generateSigner",
  async (username: string, { extra: { satlantisApi } }) => {
    if (!(await satlantisApi.getIsUserAvailability(username))) return;
    const signer = satlantisApi.generateSigner();
    return signer.privateKey.hex;
  },
);
