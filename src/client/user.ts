import { Account } from "@satlantis/api-client/sdk";
import { getTags, Tag } from "@blowater/nostr-sdk";

import satlantisClient from "./satlantisApi";
import { getContactList, getPublicKey } from "./nostr";

export const getAccount = async (npub: string) => {
  const client = satlantisClient.getClient();
  const response = await client.getAccount({ npub });
  if (response instanceof Error || !response) {
    console.error(
      `Getting account failed: ${response.message}`,
      response?.cause,
    );
    throw new Error(`Error getting account. Reason: ${response.message}`);
  }
  return response;
};

export const getInterestsPool = async () => {
  const client = satlantisClient.getClient();
  const response = await client.getInterests();

  if (response instanceof Error) {
    console.error(
      `Getting Interests Pool Failed: ${response.message}`,
      response.cause,
    );
    throw new Error(
      `Error fetching interests pool. Reason: ${response.message}`,
    );
  }

  return response;
};

export const postFollowUser = async (followerNpub: string, pubKey: string) => {
  const client = satlantisClient.getClient();
  const followEvent = await getContactList(getPublicKey(pubKey, "string"));
  const pubkeyToFollow = getPublicKey(followerNpub, "bench32");
  const tags = followEvent?.tags || [];
  const newEvent = await satlantisClient.prepareContactEvent([
    ...tags,
    ["p", pubkeyToFollow.hex],
  ]);
  const response = await client.updateAccountFollowingList({ event: newEvent });

  if (response instanceof Error) {
    console.error(`Following user Failed: ${response.message}`, response.cause);
    throw new Error(`Error following user. Reason: ${response.message}`);
  }

  return response;
};

export const postUnfollowUser = async (
  followerNpub: string,
  pubKey: string,
) => {
  const client = satlantisClient.getClient();
  const followEvent = await getContactList(getPublicKey(pubKey, "string"));
  const pubkeyToFollow = getPublicKey(followerNpub, "bench32");
  const tags = followEvent?.tags || [];
  const filteredTags = tags.filter((tag) => tag[1] !== pubkeyToFollow.hex);
  const newEvent = await satlantisClient.prepareContactEvent(filteredTags);
  const response = await client.updateAccountFollowingList({ event: newEvent });

  if (response instanceof Error) {
    console.error(
      `Unfollowing user Failed: ${response.message}`,
      response.cause,
    );
    throw new Error(`Error Unfollowing user. Reason: ${response.message}`);
  }

  return response;
};

export const postUpdateAccount = async (account: Account, npub: string) => {
  const client = satlantisClient.getClient();
  const response = await client.updateAccount({ account, npub });

  if (response instanceof Error) {
    console.error(`Update account Failed: ${response.message}`, response.cause);
    throw new Error(`Error Updating account. Reason: ${response.message}`);
  }

  return response;
};

export const postFollowPubKeys = async (
  pubkey: string,
  pubKeys: string[],
): Promise<boolean> => {
  const client = satlantisClient.getClient();
  const pubkeyToFollow = await getContactList(getPublicKey(pubkey, "hex"));
  if (!pubkeyToFollow) return false;
  const follows = new Set<string>([
    ...getTags(pubkeyToFollow).p,
    ...pubKeys.map((pub) => getPublicKey(pub, "string").hex),
  ]);
  const tags: Tag[] = Array.from(follows, (p) => ["p", p]);
  const newEvent = await satlantisClient.prepareContactEvent(tags);
  const response = await client.updateAccountFollowingList({ event: newEvent });
  if (response instanceof Error) {
    console.error(`Follow pubkeys Failed: ${response.message}`, response.cause);
    throw new Error(`Error following pubkeys. Reason: ${response.message}`);
  }

  return response;
};
