import { InMemoryAccountContext } from "@blowater/nostr-sdk";
import { getPubkeyByNip05 } from "@satlantis/api-client";

import { EXPO_PUBLIC_DOMAIN } from "src/shared/constants/env";
import satlantisApi from "./satlantisApi";

export const generateNewNostrSigner = () => {
  const newSigner = InMemoryAccountContext.Generate();
  satlantisApi.setNostrSigner(newSigner);
  return newSigner;
};

export const getIsUserAvailability = async (userName: string) => {
  const response = await getPubkeyByNip05({
    domain: EXPO_PUBLIC_DOMAIN || "",
    name: userName,
  });
  if (response instanceof Error) {
    console.error(
      `Check user availability failed: ${response.message}`,
      response.cause,
    );
    throw new Error(
      `Error checking user  availability. Reason: ${response.message}`,
    );
  }
  if (!!response) {
    throw new Error("Username already exists");
  }
  return true;
};

export const login = async (username: string, password: string) => {
  const client = satlantisApi.getClient();
  const response = await client.login({
    password,
    username,
  });
  if (typeof response === "string") {
    throw new Error(response);
  }
  if (!response || response instanceof Error) {
    console.error(
      `Logging to new account failed: ${!!response ? response.message : "Unknown error"}`,
      response?.cause,
    );
    throw new Error(
      `Error logging to new account. Reason: ${!!response ? response.message : "Unknown error"}`,
    );
  }

  satlantisApi.setJwt(response.token);
  return response.account;
};

export const loginNostr = async (nsec: string) => {
  const client = satlantisApi.getClient();
  const signer = InMemoryAccountContext.FromString(nsec);
  if (signer instanceof Error) {
    console.error(`Retrieve signer failed: ${signer.message}`, signer.cause);
    throw new Error(
      `Failed to retrieve signer from memory. Reason: ${signer.message}`,
    );
  }

  const response = await client.loginNostr(signer);
  if (response instanceof Error) {
    console.error(`Login nostr failed: ${response.message}`, response.cause);
    throw new Error(
      `Error logging nostr to satlantis account. Reason: ${response.message}`,
    );
  }

  satlantisApi.setNostrSigner(signer);
  satlantisApi.setJwt(response.token);
  return response.account;
};

export const createAccount = async (
  email: string,
  password: string,
  username: string,
) => {
  const client = satlantisApi.getClient();
  const response = await client.createAccount({
    email,
    password,
    username,
  });
  if (typeof response === "string") {
    throw new Error(response);
  }
  if (response instanceof Error || !response) {
    console.error(
      `Creating new account failed: ${!!response ? response.message : "Unknown error"}`,
      response?.cause,
    );
    throw new Error(
      `Error creating new account. Reason: ${!!response ? response.message : "Unknown error"}`,
    );
  }
  return response;
};

export const postInitializeResetPassword = async (username: string) => {
  const client = satlantisApi.getClient();
  const response = await client.initiatePasswordReset({ username });
  if (response instanceof Error) {
    console.error(
      `Initiate password reset failed: ${response.message}`,
      response.cause,
    );
    throw new Error(
      `Error trying to initiate password reset. Reason: ${response.message}`,
    );
  }

  return response.success;
};

export const postResetPassword = async (password: string) => {
  const client = satlantisApi.getClient();
  const token = satlantisApi.getJwt();
  const response = await client.resetPassword({
    password,
    token,
  });
  if (response instanceof Error) {
    console.error(`Password reset failed: ${response.message}`, response.cause);
    throw new Error(
      `Error trying to reset password. Reason: ${response.message}`,
    );
  }

  return response.success;
};
