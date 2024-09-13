import { Client, func_GetJwt } from "@satlantis/api-client";
import { NostrKind, Signer, Tag } from "@blowater/nostr-sdk";

import { EXPO_PUBLIC_CLIENT_ENDPOINT } from "src/shared/constants/env";
import { publishEvent, prepareEvent } from "./nostr";

export class SatlantisClient {
  private static instance: SatlantisClient;
  private jwt: string = "";
  private nostrSigner: Signer | undefined;
  private client: Client | undefined;

  private getNostrSigner = async () => {
    if (!this.nostrSigner) {
      console.error("Getting nostr signer failed: It doesn't exist");
      throw new Error("Error getting nostr signer. Reason: Doesn't exist");
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

  public setNostrSigner(newSigner: Signer | undefined) {
    this.nostrSigner = newSigner;
  }

  public async prepareContactEvent(tags: Tag[]) {
    const signer = await this.getNostrSigner();
    const newEvent = await prepareEvent(signer, NostrKind.CONTACTS, tags);
    await publishEvent(newEvent);
    return newEvent;
  }
}

const satlantisApi = SatlantisClient.getInstance(
  EXPO_PUBLIC_CLIENT_ENDPOINT || "",
);
export default satlantisApi;
