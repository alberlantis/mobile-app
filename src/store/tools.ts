import { createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { InMemoryAccountContext } from "@blowater/nostr-sdk";
import { Account, Interest } from "@satlantis/api-client";

import { store } from "./store";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  extra: {
    api: {
      AuthClient: {
        generateNewNostrSigner(): InMemoryAccountContext;
        getIsUserAvailability(username: string): Promise<boolean>;
        login(username: string, password: string): Promise<Account>;
        loginNostr(nsec: string): Promise<Account>;
        createAccount(
          email: string,
          password: string,
          username: string,
        ): Promise<boolean>;
      };
      UserClient: {
        getInterestsPool(): Promise<Interest[]>;
      };
    };
  };
}>();
