import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  createTransform,
  type PersistConfig,
  type Transform,
} from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import AsyncStorage from "@react-native-async-storage/async-storage";
import createSecureStore from "redux-persist-expo-securestore";

import { UploadClient } from "src/client";
import * as Nostr from "./Nostr";
import * as Profile from "./Profile";
import * as Auth from "./Auth";
import * as User from "./User";

type SecureReducer = ReturnType<typeof secureReducers>;
type RegularReducer = ReturnType<typeof regularReducers>;

const createWhitelistTransform = (listMap: any): Transform<any, any> => {
  const serializeStorage = (state: any, key: any) => {
    const keysToPersist = listMap[key];
    if (!keysToPersist || !keysToPersist.length) return state;
    return keysToPersist.reduce((acc: any, stateKey: any) => {
      acc[stateKey] = (state as any)[stateKey];
      return acc;
    }, {} as any);
  };
  return createTransform(serializeStorage, serializeStorage, {
    whitelist: Object.keys(listMap),
  });
};

const secureStorage = createSecureStore();
const securePersistConfig: PersistConfig<SecureReducer> = {
  key: "secure",
  storage: secureStorage,
  stateReconciler: autoMergeLevel2,
  transforms: [
    createWhitelistTransform({
      nostr: ["privateKey", "token"],
    }),
  ],
};

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
  transforms: [
    createWhitelistTransform({
      auth: ["isLogged"],
    }),
  ],
};

const regularReducers = combineReducers({
  profile: Profile.reducer,
  auth: Auth.reducer,
  user: User.reducer,
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
          api: {
            UploadClient,
          },
          actions: {
            auth: Auth.actions,
            user: User.actions,
            nostr: Nostr.actions,
            profile: Profile.actions,
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
