import { Client } from "@satlantis/api-client";
import { NostrKind, Signer, Tag } from "@blowater/nostr-sdk";

import {
  EXPO_PUBLIC_CLIENT_ENDPOINT,
  EXPO_PUBLIC_SATLANTIS_RELAY,
} from "src/shared/constants/env";
import { publishEvent, prepareEvent } from "./nostr";

let _jwt: string = "";
export function setJWT(jwt: string) {
  _jwt = jwt;
}

let _signer: Signer | undefined;
export function setNostrSigner(signer: Signer) {
  _signer = signer;
}

const _satlantisClient = Client.New({
  baseURL: EXPO_PUBLIC_CLIENT_ENDPOINT || "",
  relay_url: EXPO_PUBLIC_SATLANTIS_RELAY || "",
  getJwt: () => {
    return _jwt;
  },
  getNostrSigner: async () => {
    if (!_signer) {
      return new Error("not signed in");
    }
    return _signer;
  },
});
if (_satlantisClient instanceof Error) {
  throw _satlantisClient;
}
export const satlantisClient = _satlantisClient;

export async function prepareContactEvent(tags: Tag[]) {
  if (!_signer) {
    return new Error("not signed in");
  }
  const newEvent = await prepareEvent(_signer, NostrKind.CONTACTS, tags);
  await publishEvent(newEvent);
  return newEvent;
}
