import type { ReshapedNostrEvent, Note } from "@satlantis/api-client";
import type { NostrEvent, Tag } from "@blowater/nostr-sdk/nostr";

export const getRawNostrEvent = (event: ReshapedNostrEvent) => {
  const tags: Tag[] = event.tags
    ? event.tags.map((tag) => {
        return [tag.type, ...tag.values];
      })
    : [];
  const nostrEvent: NostrEvent = {
    content: event.content,
    created_at: event.createdAt,
    id: event.nostrId,
    kind: event.kind,
    pubkey: event.pubkey,
    sig: event.sig,
    tags: tags,
  };
  return nostrEvent;
};

export const getReplyTags = (post: Note) => {
  const nostrEvent = getRawNostrEvent(post.event);
  let rootTagExists = false;
  const tags = nostrEvent.tags.reduce<Tag[]>((acc, tag) => {
    if (tag[0] === "e" && tag[3] === "root") {
      rootTagExists = true;
      return acc.concat(
        [tag],
        [
          [
            "e",
            String(post.event.nostrId),
            "",
            "reply",
            String(post.account.pubKey),
          ],
        ],
        [["p", String(post.account.pubKey)]],
      );
    } else if (tag[0] === "p") {
      return acc.concat([tag]);
    }
    return acc;
  }, []);
  const finalTags = rootTagExists
    ? tags
    : tags.concat(
        [
          [
            "e",
            String(post.event.nostrId),
            "",
            "root",
            String(post.account.pubKey),
          ],
        ],
        [["p", String(post.account.pubKey)]],
      );
  return finalTags;
};
