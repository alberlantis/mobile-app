import { configureStore } from "@reduxjs/toolkit";

import { reducer } from "./Profile";

const store = configureStore({
  reducer: {
    profile: reducer,
  },
});

export default store;
