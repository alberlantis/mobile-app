import { NostrKind, prepareNostrEvent } from "@blowater/nostr-sdk/nostr";
import type { NostrEventTag } from "@satlantis/api-client";

import { getReplyTags } from "src/client/nostr";
import { createAppAsyncThunk } from "src/store/tools";
import { satlantisClient } from "src/client/satlantisApi";

export enum NoteType {
  BASIC = 1,
  REVIEW,
  GALLERY,
  PUBLIC_CHAT,
  PRIVATE_CHAT,
  CALENDAR_EVENT,
  CALENDAR,
  PING,
  REACTION,
  DELETE_NOTE,
  REPLY_NOTE,
  MEDIA,
}

type LikePost = {
  postId: number;
  pubkey: string;
  postKind: number;
  nostrId: string;
};

export const shouldLikePosts = createAppAsyncThunk(
  "post/likePosts",
  async (
    { postId, pubkey, postKind, nostrId }: LikePost,
    { getState, dispatch },
  ) => {
    const account = getState().user.myAccount;
    if (!account || !account.id) return;
    const signer = await satlantisClient.getNostrSigner();
    if (signer instanceof Error) {
      return signer;
    }

    const event = await prepareNostrEvent(signer, {
      kind: NostrKind.REACTION,
      tags: [
        ["e", nostrId],
        ["p", pubkey],
        ["k", String(postKind)],
      ],
      content: "+",
    });
    if (event instanceof Error) {
      throw event;
    }

    const response = await satlantisClient.postReaction({
      accountId: account.id,
      event,
      parentId: postId,
      chatNoteId: 0,
      noteId: postId,
      noteType: NoteType.REACTION,
    });
    if (response instanceof Error) {
      throw response;
    }

    await dispatch(shouldFetchPost(postId));
    return response;
  },
);

export const shouldFetchPost = createAppAsyncThunk(
  "get/post",
  async (postId: number) => {
    const response = await satlantisClient.getNote({ noteID: postId });
    if (response instanceof Error) {
      throw response;
    }
    if (!response) {
      throw new Error("Note was not found");
    }

    return response;
  },
);

type PublishReply = {
  comment: string;
  eventTags: NostrEventTag[];
  content: string;
  createdAt: string;
  nostrId: string;
  kind: number;
  pubkey: string;
  sig: string;
  id: number;
  type: NoteType;
};

export const shouldPublishReply = createAppAsyncThunk(
  "post/publishReply",
  async (
    {
      eventTags,
      content,
      createdAt,
      nostrId,
      kind,
      pubkey,
      sig,
      comment,
      id,
      type,
    }: PublishReply,
    { dispatch },
  ) => {
    const signer = await satlantisClient.getNostrSigner();
    if (signer instanceof Error) {
      throw signer;
    }

    const tags = getReplyTags({
      eventTags,
      content,
      createdAt,
      nostrId,
      kind,
      pubkey,
      sig,
    });
    const event = await prepareNostrEvent(signer, {
      kind: NostrKind.TEXT_NOTE,
      tags,
      content: comment.trim(),
    });
    if (event instanceof Error) {
      throw event;
    }

    const response = await satlantisClient._postNote({
      event,
      noteType: type,
      parentId: id,
    });
    if (response instanceof Error) {
      throw response;
    }

    await dispatch(shouldFetchPost(id));
    return response;
  },
);
