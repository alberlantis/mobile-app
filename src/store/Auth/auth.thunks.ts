import { createAppAsyncThunk } from "src/store/tools";

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
        api: { AuthClient },
        actions: { user, nostr },
      },
      dispatch,
    },
  ) => {
    const response = await AuthClient.login(
      signUpData.username,
      signUpData.password,
    );
    dispatch(user.shouldSetAccount(response.account));
    dispatch(nostr.shouldUpdateToken(response.token));
  },
);

export const shouldCreateAccount = createAppAsyncThunk(
  "post/createAccount",
  async (
    signUpData: SignUp,
    {
      extra: {
        api: { AuthClient },
      },
    },
  ) => {
    return await AuthClient.createAccount(
      signUpData.email || "",
      signUpData.password,
      signUpData.username,
    );
  },
);

export const shouldLoginSigner = createAppAsyncThunk(
  "post/loginSigner",
  async (
    nsec: string,
    {
      extra: {
        api: { AuthClient },
        actions: { user, nostr },
      },
      dispatch,
    },
  ) => {
    const response = await AuthClient.loginNostr(nsec);
    dispatch(user.shouldSetAccount(response.account));
    dispatch(nostr.shouldUpdateToken(response.token));
  },
);

export const shouldPostInitializeResetPassword = createAppAsyncThunk(
  "post/initializeResetPassword",
  async (
    username: string,
    {
      extra: {
        api: { AuthClient },
      },
    },
  ) => {
    const isInitializeResetPasswordSuccessfull =
      await AuthClient.postInitializeResetPassword(username);
    return isInitializeResetPasswordSuccessfull;
  },
);

export const shouldPostResetPassword = createAppAsyncThunk(
  "post/resetPassword",
  async (
    password: string,
    {
      extra: {
        api: { AuthClient },
      },
    },
  ) => {
    const isResetPasswordSuccessfull =
      await AuthClient.postResetPassword(password);
    return isResetPasswordSuccessfull;
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
