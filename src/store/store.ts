import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  type PersistConfig,
} from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as Nostr from "./Nostr";
import * as Profile from "./Profile";
import * as Auth from "./Auth";
import * as User from "./User";
import * as Posts from "./Posts";
import * as Locations from "./Locations";

type RegularReducer = ReturnType<typeof regularReducers>;

const regularStorage = {
  ...AsyncStorage,
  getItem: async (key: string) => {
    const value = await AsyncStorage.getItem(key);
    return !!value ? JSON.parse(value) : null;
  },
  setItem: async <T>(key: string, value: T) => {
    AsyncStorage.setItem(key, JSON.stringify(value));
  },
};
const asyncPersistConfig: PersistConfig<RegularReducer> = {
  storage: regularStorage,
  key: "async",
  stateReconciler: autoMergeLevel2,
  whitelist: ["auth", "nostr"],
};

const regularReducers = combineReducers({
  profile: Profile.reducer,
  auth: Auth.reducer,
  user: User.reducer,
  posts: Posts.reducer,
  locations: Locations.reducer,
  nostr: Nostr.reducer,
});

const store = configureStore({
  reducer: persistReducer<RegularReducer>(asyncPersistConfig, regularReducers),
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      thunk: {
        extraArgument: {
          actions: {
            auth: { thunks: Auth.thunks, actions: Auth.actions },
            user: { thunks: User.thunks, actions: User.actions },
            nostr: { thunks: Nostr.thunks, actions: Nostr.actions },
            profile: { thunks: Profile.thunks, actions: Profile.actions },
            posts: { thunks: Posts.thunks, actions: Posts.actions },
            locations: { thunks: Locations.thunks, actions: Locations.actions },
          },
        },
      },
      immutableCheck: false,
      serializableCheck: false,
    });
    return middlewares;
  },
});

const persistor = persistStore(store);

export { store, persistor };
