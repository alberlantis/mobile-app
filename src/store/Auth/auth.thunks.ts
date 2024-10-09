import { InMemoryAccountContext } from "@blowater/nostr-sdk";

import { createAppAsyncThunk } from "src/store/tools";
import {
  satlantisClient,
  setJWT,
  setNostrSigner,
} from "src/client/satlantisApi";

interface SignIn {
  password: string;
  username: string;
}

export const shouldLoginAccount = createAppAsyncThunk(
  "post/loginAccount",
  async (signUpData: SignIn, { dispatch }) => {
    const response = await satlantisClient.login({
      password: signUpData.username,
      username: signUpData.password,
    });
    if (response instanceof Error) {
      throw response;
    }
    if (typeof response === "string") {
      throw new Error(response);
    }
    if (!response) {
      throw new Error("Account doesnt exist");
    }

    dispatch(shouldLogin(response.token));
  },
);

interface SignUp {
  email: string;
  password: string;
  username: string;
}

export const shouldCreateAccount = createAppAsyncThunk(
  "post/createAccount",
  async (signUpData: SignUp) => {
    const response = await satlantisClient.createAccount({
      email: signUpData.email,
      password: signUpData.password,
      username: signUpData.username,
    });
    if (response instanceof Error) {
      throw response;
    }
    if (typeof response === "string") {
      throw new Error(response);
    }
    if (!response) {
      throw new Error("Account doesnt exist");
    }

    return response;
  },
);

export const shouldLoginSigner = createAppAsyncThunk(
  "post/loginSigner",
  async (
    nsec: string,
    {
      extra: {
        actions: { nostr },
      },
      dispatch,
    },
  ) => {
    const signer = InMemoryAccountContext.FromString(nsec);
    if (signer instanceof Error) {
      throw signer;
    }

    const response = await satlantisClient.loginNostr(signer);
    if (response instanceof Error) {
      throw response;
    }
    setNostrSigner(signer);
    dispatch(nostr.actions.shouldUpdatePrivateKey(nsec));
    dispatch(shouldLogin(response.token));
  },
);

export const shouldPostInitializeResetPassword = createAppAsyncThunk(
  "post/initializeResetPassword",
  async (username: string) => {
    const response = await satlantisClient.initiatePasswordReset({ username });
    if (response instanceof Error) {
      throw response;
    }
    return response.success;
  },
);

export const shouldPostResetPassword = createAppAsyncThunk(
  "post/resetPassword",
  async (password: string) => {
    const token = satlantisClient.getJwt();
    const response = await satlantisClient.resetPassword({
      password,
      token,
    });
    if (response instanceof Error) {
      throw response;
    }
    return response.success;
  },
);

export const shouldLogout = createAppAsyncThunk(
  "post/logout",
  (
    ...[
      ,
      {
        dispatch,
        extra: {
          actions: { auth, nostr, user, profile /**posts*/ },
        },
      },
    ]
  ) => {
    dispatch(auth.actions.logout());
    dispatch(nostr.actions.logout());
    dispatch(user.actions.logout());
    // dispatch(posts.actions.logout());
    dispatch(profile.actions.logout());
  },
);

export const shouldLogin = createAppAsyncThunk(
  "post/login",
  async (
    token: string,
    {
      dispatch,
      extra: {
        actions: { nostr, user },
      },
    },
  ) => {
    setJWT(token);
    dispatch(nostr.actions.shouldUpdateToken(token));
    dispatch(user.thunks.shouldFetchMyProfile());
  },
);
