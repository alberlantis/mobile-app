import type { NostrEventTag } from "@satlantis/api-client";
import type { NostrEvent, Tag } from "@blowater/nostr-sdk/nostr";
import { satlantisClient } from "./satlantisApi";

export const uploadFile = async (uri: string) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  const filename = uri.split("/").pop() || "";
  const file = new File([blob], filename, { type: blob.type });
  const imageUrl = await satlantisClient.uploadFile({ file });
  if (imageUrl instanceof Error) {
    throw imageUrl;
  }

  return imageUrl;
};

type RawNostrEventArgs = {
  eventTags: NostrEventTag[];
  content: string;
  createdAt: string;
  nostrId: string;
  kind: number;
  pubkey: string;
  sig: string;
};

export const getRawNostrEvent = ({
  eventTags,
  content,
  createdAt,
  nostrId,
  kind,
  pubkey,
  sig,
}: RawNostrEventArgs) => {
  const tags: Tag[] = !!eventTags.length
    ? eventTags.map((tag) => {
        return [tag.type, ...tag.values];
      })
    : [];
  const nostrEvent: NostrEvent = {
    content,
    created_at: Number(createdAt),
    id: nostrId,
    kind,
    pubkey,
    sig,
    tags,
  };
  return nostrEvent;
};

export const getReplyTags = ({
  eventTags,
  content,
  createdAt,
  nostrId,
  kind,
  pubkey,
  sig,
}: RawNostrEventArgs) => {
  const nostrEvent = getRawNostrEvent({
    eventTags,
    content,
    createdAt,
    nostrId,
    kind,
    pubkey,
    sig,
  });
  let rootTagExists = false;
  const tags = nostrEvent.tags.reduce<Tag[]>((acc, tag) => {
    if (tag[0] === "e" && tag[3] === "root") {
      rootTagExists = true;
      return acc.concat(
        [tag],
        [["e", String(nostrId), "", "reply", String(pubkey)]],
        [["p", String(pubkey)]],
      );
    } else if (tag[0] === "p") {
      return acc.concat([tag]);
    }
    return acc;
  }, []);
  const finalTags = rootTagExists
    ? tags
    : tags.concat(
        [["e", String(nostrId), "", "root", String(pubkey)]],
        [["p", String(pubkey)]],
      );
  return finalTags;
};
