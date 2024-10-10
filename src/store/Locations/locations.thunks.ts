import { satlantisClient } from "src/client/satlantisApi";
import { createAppAsyncThunk } from "src/store/tools";

export const shouldGetLocationsCategories = createAppAsyncThunk(
  "get/locations",
  async () => {
    const response = await satlantisClient.getLocationCategories();

    if (response instanceof Error) {
      throw response;
    }

    return response;
  },
);
