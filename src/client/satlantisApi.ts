import {
  getPubkeyByNip05,
  Client,
  func_GetNostrSigner,
} from "@satlantis/api-client";
import { InMemoryAccountContext } from "@blowater/nostr-sdk";

import {
  EXPO_PUBLIC_DOMAIN,
  EXPO_PUBLIC_CLIENT_ENDPOINT,
} from "src/shared/constants/env";

export class SatlantisClient {
  private jwt: string = "";
  private nostrSigner: InMemoryAccountContext | undefined;
  private client: Client | undefined;

  private getNostrSigner: func_GetNostrSigner = async () => {
    if (!this.nostrSigner) return new Error("No signer exist");
    return this.nostrSigner;
  };

  constructor(baseUrl: string) {
    const newClient = Client.New({
      baseURL: new URL(baseUrl),
      getJwt: () => this.jwt,
      getNostrSigner: this.getNostrSigner.bind(this),
    });
    if (newClient instanceof Error) {
      console.log("Error creating new api client", newClient);
      return;
    }

    this.client = newClient;
  }

  public generateSigner() {
    const newSigner = InMemoryAccountContext.Generate();
    this.nostrSigner = newSigner;
    return newSigner;
  }

  public async loginNostr(nsec: string) {
    const signer = InMemoryAccountContext.FromString(nsec);
    if (signer instanceof Error) {
      throw new Error("Error getting existing signer from memory", signer);
    }
    this.nostrSigner = signer;
    const response = await this.client?.loginNostr(signer);
    if (response instanceof Error) {
      throw new Error(
        "Error trying to login nostr account on satlantis",
        response,
      );
    }
    this.jwt = response?.token || "";
    return response?.account;
  }

  public async getIsUserAvailability(userName: string) {
    const pubkey = await getPubkeyByNip05({
      domain: EXPO_PUBLIC_DOMAIN || "",
      name: userName,
    });
    if (pubkey instanceof Error) {
      throw new Error("Check user availability failed", pubkey);
    }
    if (!!pubkey) {
      throw new Error("Username already exists");
    }
    return true;
  }

  public async createAccount(
    email: string,
    password: string,
    username: string,
  ) {
    const response = await this.client?.createAccount({
      email,
      password,
      username,
    });
    if (typeof response === "string") {
      throw new Error(response);
    }
    if (response instanceof Error || !response) {
      throw new Error("Error creating new account", response);
    }
    return response;
  }

  public async login(username: string, password: string) {
    const loggedIn = await this.client?.login({
      password,
      username,
    });
    if (typeof loggedIn === "string") {
      throw new Error(loggedIn);
    }
    if (!loggedIn || loggedIn instanceof Error) {
      throw new Error("Error logged in to the account", loggedIn);
    }
    this.jwt = loggedIn.token;
    return loggedIn.account;
  }
}

const satlantisApi = new SatlantisClient(EXPO_PUBLIC_CLIENT_ENDPOINT || "");

export default satlantisApi;
