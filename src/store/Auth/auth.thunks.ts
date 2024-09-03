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
    await satlantisApi.createAccount(
      signUpData.email || "",
      signUpData.password,
      signUpData.username,
    );
  },
);

export const shouldLoginSigner = createAppAsyncThunk(
  "post/loginSigner",
  async (nsec: string, { extra: { satlantisApi } }) => {
    const account = await satlantisApi.loginNostr(nsec);
    return account;
  },
);
