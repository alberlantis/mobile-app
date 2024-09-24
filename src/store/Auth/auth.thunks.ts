import { InMemoryAccountContext } from "@blowater/nostr-sdk";

import { createAppAsyncThunk } from "src/store/tools";
import {
  satlantisClient,
  setJWT,
  setNostrSigner,
} from "src/client/satlantisApi";
interface SignUp {
  email?: string;
  password: string;
  username: string;
}

export const shouldLoginAccount = createAppAsyncThunk(
  "post/loginAccount",
  async (
    signUpData: SignUp,
    {
      extra: {
        actions: { user, nostr },
      },
      dispatch,
    },
  ) => {
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
    setJWT(response.token);
    dispatch(user.shouldSetAccount(response.account));
    dispatch(nostr.shouldUpdateToken(response.token));
  },
);

export const shouldCreateAccount = createAppAsyncThunk(
  "post/createAccount",
  async (signUpData: SignUp) => {
    const response = await satlantisClient.createAccount({
      email: signUpData.email || "",
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
        actions: { user, nostr },
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
    setJWT(response.token);
    dispatch(user.shouldSetAccount(response.account));
    dispatch(nostr.shouldUpdatePrivateKey(nsec));
    dispatch(nostr.shouldUpdateToken(response.token));
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
          actions: { auth, nostr, user },
        },
      },
    ]
  ) => {
    dispatch(auth.logout());
    dispatch(nostr.logout());
    dispatch(user.logout());
  },
);
