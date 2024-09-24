import { Client } from "@satlantis/api-client";
import { Encrypter, Signer } from "@blowater/nostr-sdk";

import {
  EXPO_PUBLIC_CLIENT_ENDPOINT,
  EXPO_PUBLIC_SATLANTIS_RELAY,
} from "src/shared/constants/env";

// todo: questions for albert (i think i am losing the token auth after user open the app again as login)
let _jwt: string = "";
export function setJWT(jwt: string) {
  _jwt = jwt;
}

let _signer: (Signer & Encrypter) | undefined;
export function setNostrSigner(signer: Signer & Encrypter) {
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
