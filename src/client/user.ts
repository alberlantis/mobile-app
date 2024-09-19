import { prepareNostrEvent } from "@blowater/nostr-sdk/event";
import { PublicKey } from "@blowater/nostr-sdk/key";
import { NostrKind, getTags, Tag } from "@blowater/nostr-sdk/nostr";
import { Account } from "@satlantis/api-client";
import { getContactList } from "./nostr";
import { prepareContactEvent, satlantisClient } from "./satlantisApi";

export const getAccount = async (npub: string) => {
  const response = await satlantisClient.getAccount({ npub });
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
  const response = await satlantisClient.getInterests();

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
  const me = PublicKey.FromString(pubKey);
  if (me instanceof Error) {
    throw me;
  }
  const pubkeyToFollow = PublicKey.FromString(followerNpub);
  if (pubkeyToFollow instanceof Error) {
    throw pubkeyToFollow;
  }
  const followEvent = await getContactList(me);
  const tags = followEvent?.tags || [];
  const signer = await satlantisClient.getNostrSigner();
  if (signer instanceof Error) {
    throw signer;
  }
  const newEvent = await prepareNostrEvent(signer, {
    content: "",
    kind: NostrKind.CONTACTS,
    tags: [...tags, ["p", pubkeyToFollow.hex]],
  });
  if (newEvent instanceof Error) {
    throw newEvent;
  }
  const response = await satlantisClient.updateAccountFollowingList({
    event: newEvent,
  });

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
  const me = PublicKey.FromString(pubKey);
  if (me instanceof Error) {
    throw me;
  }
  const followEvent = await getContactList(me);

  const pubkeyToUnfollow = PublicKey.FromString(followerNpub);
  if (pubkeyToUnfollow instanceof Error) {
    throw pubkeyToUnfollow;
  }

  const tags = followEvent?.tags || [];
  const filteredTags = tags.filter((tag) => tag[1] !== pubkeyToUnfollow.hex);
  const newEvent = await prepareContactEvent(filteredTags);
  if (newEvent instanceof Error) {
    throw newEvent;
  }
  const response = await satlantisClient.updateAccountFollowingList({
    event: newEvent,
  });

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
  const response = await satlantisClient.updateAccount({ account, npub });

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
  const me = PublicKey.FromString(pubkey);
  if (me instanceof Error) {
    throw me;
  }
  const myContactList = await getContactList(me);

  if (!myContactList) return false;

  const follows = new Set<string>([...getTags(myContactList).p, ...pubKeys]);
  const tags: Tag[] = Array.from(follows, (p) => ["p", p]);
  const newEvent = await prepareContactEvent(tags);
  if (newEvent instanceof Error) {
    throw newEvent;
  }
  const response = await satlantisClient.updateAccountFollowingList({
    event: newEvent,
  });
  if (response instanceof Error) {
    console.error(`Follow pubkeys Failed: ${response.message}`, response.cause);
    throw new Error(`Error following pubkeys. Reason: ${response.message}`);
  }

  return response;
};
