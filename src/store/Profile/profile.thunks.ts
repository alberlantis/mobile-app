import { createAppAsyncThunk } from "src/store/tools";

import { fetchImages } from "mock/profile/image-pool-client";

export const shouldFetchProfilePosts = createAppAsyncThunk(
  "get/posts",
  async (page: number) => {
    try {
      return await fetchImages(page);
    } catch (e) {
      throw e;
    }
  },
);
