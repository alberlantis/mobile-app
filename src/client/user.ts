import satlantisApi from "./satlantisApi";
import { getContactList, getPublicKey } from "./nostr";

export const getAccount = async (npub: string) => {
  const client = satlantisApi.getClient();
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
  const client = satlantisApi.getClient();
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
  const client = satlantisApi.getClient();
  const followEvent = await getContactList(pubKey);
  const pubkeyToFollow = getPublicKey(followerNpub, "bench32");
  const tags = followEvent?.tags || [];
  const newEvent = await satlantisApi.prepareContactEvent([
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
  const client = satlantisApi.getClient();
  const followEvent = await getContactList(pubKey);
  const pubkeyToFollow = getPublicKey(followerNpub, "bench32");
  const tags = followEvent?.tags || [];
  const filteredTags = tags.filter((tag) => tag[1] !== pubkeyToFollow.hex);
  const newEvent = await satlantisApi.prepareContactEvent(filteredTags);
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
