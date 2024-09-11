import {
  Client,
  func_GetNostrSigner,
  func_GetJwt,
} from "@satlantis/api-client";
import { InMemoryAccountContext } from "@blowater/nostr-sdk";

import { EXPO_PUBLIC_CLIENT_ENDPOINT } from "src/shared/constants/env";

export class SatlantisClient {
  private static instance: SatlantisClient;
  private jwt: string = "";
  private nostrSigner: InMemoryAccountContext | undefined;
  private client: Client | undefined;

  private getNostrSigner: func_GetNostrSigner = async () => {
    if (!this.nostrSigner) {
      console.error("Getting nostr signer failed: It doesn't exist");
      return new Error("Error getting nostr signer. Reason: Doesn't exist");
    }
    return this.nostrSigner;
  };

  private initClient(baseUrl: string): void {
    if (!this.client) {
      const newClient = Client.New({
        baseURL: new URL(baseUrl),
        getJwt: this.getJwt.bind(this),
        getNostrSigner: this.getNostrSigner.bind(this),
      });

      if (newClient instanceof Error) {
        console.error(
          `Create client failed: ${newClient.message}`,
          newClient.cause,
        );
        throw new Error(
          `Failed to create new api client. Reason: ${newClient.message}`,
        );
      }

      this.client = newClient;
    }
  }

  public static getInstance(baseUrl: string): SatlantisClient {
    if (!SatlantisClient.instance) {
      SatlantisClient.instance = new SatlantisClient();
      SatlantisClient.instance.initClient(baseUrl);
    }
    return SatlantisClient.instance;
  }

  public getClient() {
    if (!this.client) {
      console.error("Getting client api failed: It's not initialized");
      throw new Error(
        "API client is not initialized. Call getInstance with a valid baseUrl first.",
      );
    }
    return this.client;
  }

  public getJwt: func_GetJwt = () => {
    return this.jwt;
  };

  public setJwt(newJwt: string) {
    this.jwt = newJwt;
  }

  public setNostrSigner(newSigner: InMemoryAccountContext | undefined) {
    this.nostrSigner = newSigner;
  }
}

const satlantisApi = SatlantisClient.getInstance(
  EXPO_PUBLIC_CLIENT_ENDPOINT || "",
);
export default satlantisApi;
