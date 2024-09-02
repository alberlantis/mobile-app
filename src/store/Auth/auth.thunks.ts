import { createAppAsyncThunk } from "src/store/tools";

interface SignUp {
  email?: string;
  password: string;
  username: string;
}

export const shouldLoginAccount = createAppAsyncThunk(
  "post/loginAccount",
  async (signUpData: SignUp, { extra: { satlantisApi } }) => {
    const account = await satlantisApi.login(
      signUpData.username,
      signUpData.password,
    );
    return account;
  },
);

export const shouldCreateAccount = createAppAsyncThunk(
  "post/createAccount",
  async (signUpData: SignUp, { extra: { satlantisApi }, dispatch }) => {
    const isAccountCreated = await satlantisApi.createAccount(
      signUpData.email || "",
      signUpData.password,
      signUpData.username,
    );
    if (!isAccountCreated) return;
    await dispatch(shouldLoginAccount(signUpData));
  },
);

export const shouldLoginSigner = createAppAsyncThunk(
  "post/loginSigner",
  async (
    ...[
      ,
      {
        extra: { satlantisApi },
      },
    ]
  ) => {
    const account = await satlantisApi.loginNostr();
    return account;
  },
);
