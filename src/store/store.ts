import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  type PersistConfig,
} from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import AsyncStorage from "@react-native-async-storage/async-storage";
import createSecureStore from "redux-persist-expo-securestore";
import createFilter from "redux-persist-transform-filter";

import * as Nostr from "./Nostr";
import * as Profile from "./Profile";
import * as Auth from "./Auth";
import * as User from "./User";
import * as Posts from "./Posts";

type SecureReducer = ReturnType<typeof secureReducers>;
type RegularReducer = ReturnType<typeof regularReducers>;

const nostrFilter = createFilter("nostr", ["privateKey", "token"]);
const secureStorage = createSecureStore();
const securePersistConfig: PersistConfig<SecureReducer> = {
  key: "secure",
  storage: secureStorage,
  stateReconciler: autoMergeLevel2,
  transforms: [nostrFilter],
};

const authFilter = createFilter("auth", ["isLogged"]);
const userFilter = createFilter("user", ["account"]);
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
  transforms: [authFilter, userFilter],
};

const regularReducers = combineReducers({
  profile: Profile.reducer,
  auth: Auth.reducer,
  user: User.reducer,
  posts: Posts.reducer,
});
const secureReducers = combineReducers({
  nostr: Nostr.reducer,
});
const regular = persistReducer<RegularReducer>(
  asyncPersistConfig,
  regularReducers,
);
const secure = persistReducer<SecureReducer>(
  securePersistConfig,
  secureReducers,
);

const store = configureStore({
  reducer: { regular, secure },
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      thunk: {
        extraArgument: {
          actions: {
            auth: Auth.actions,
            user: User.actions,
            nostr: Nostr.actions,
            profile: Profile.actions,
            posts: Posts.actions,
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
