import { createAppAsyncThunk } from "src/store/tools";

export const shouldFetchAllInterests = createAppAsyncThunk(
  "get/interestsPool",
  async (
    ...[
      ,
      {
        extra: {
          api: { UserClient },
        },
      },
    ]
  ) => {
    const interestsPool = await UserClient.getInterestsPool();
    return interestsPool;
  },
);
