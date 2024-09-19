import { InMemoryAccountContext } from "@blowater/nostr-sdk";
import { getPubkeyByNip05 } from "@satlantis/api-client";
import { setNostrSigner, satlantisClient, setJWT } from "./satlantisApi";

import { EXPO_PUBLIC_DOMAIN } from "src/shared/constants/env";

export const generateNewNostrSigner = () => {
  const newSigner = InMemoryAccountContext.Generate();
  setNostrSigner(newSigner);
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
  const response = await satlantisClient.login({
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

  setJWT(response.token);
  return {
    account: response.account,
    token: response.token,
  };
};

export const loginNostr = async (nsec: string) => {
  const signer = InMemoryAccountContext.FromString(nsec);
  if (signer instanceof Error) {
    console.error(`Retrieve signer failed: ${signer.message}`, signer.cause);
    throw new Error(
      `Failed to retrieve signer from memory. Reason: ${signer.message}`,
    );
  }

  const response = await satlantisClient.loginNostr(signer);
  if (response instanceof Error) {
    console.error(`Login nostr failed: ${response.message}`, response.cause);
    throw new Error(
      `Error logging nostr to satlantis account. Reason: ${response.message}`,
    );
  }

  setNostrSigner(signer);
  setJWT(response.token);
  return {
    account: response.account,
    token: response.token,
  };
};

export const createAccount = async (
  email: string,
  password: string,
  username: string,
) => {
  const response = await satlantisClient.createAccount({
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
  const response = await satlantisClient.initiatePasswordReset({ username });
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
  const token = satlantisClient.getJwt();
  // todo:
  //  this is not how reset password works
  //  we don't have any specific flow for mobile to reset password
  const response = await satlantisClient.resetPassword({
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
