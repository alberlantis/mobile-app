import { NostrKind, prepareNostrEvent } from "@blowater/nostr-sdk/nostr";

import { getReplyTags } from "src/client/nostr";
import { createAppAsyncThunk } from "src/store/tools";
import { satlantisClient } from "src/client/satlantisApi";
import type { Posts } from "./posts.selectors";

enum NoteType {
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

type GetPosts = {
  npub: string;
  page: number;
  limit?: number;
};

export const shouldFetchPosts = createAppAsyncThunk(
  "get/posts",
  async ({ npub, page, limit = 12 }: GetPosts) => {
    const response = await satlantisClient.getNotes({
      npub,
      page,
      limit,
    });
    if (response instanceof Error) {
      throw response;
    }

    return response;
  },
);

export const shouldLikePosts = createAppAsyncThunk(
  "post/likePosts",
  async (post: Posts, { getState }) => {
    const account = getState().regular.user.account;
    if (!account || !account.id) return;
    const signer = await satlantisClient.getNostrSigner();
    if (signer instanceof Error) {
      return signer;
    }

    const event = await prepareNostrEvent(signer, {
      kind: NostrKind.REACTION,
      tags: [
        ["e", post.event.nostrId],
        ["p", post.event.pubkey],
        ["k", String(post.event.kind)],
      ],
      content: "+",
    });
    if (event instanceof Error) {
      throw event;
    }

    const response = await satlantisClient.postReaction({
      accountId: account.id,
      event,
      parentId: post.id,
      chatNoteId: 0,
      noteId: post.id,
      noteType: NoteType.REACTION,
    });
    if (response instanceof Error) {
      throw response;
    }

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

    const updatedPost = {
      ...response.itself,
      descendants: response.descendants.sort(
        (a, b) => b.event.createdAt - a.event.createdAt,
      ),
    };

    return updatedPost;
  },
);

type PublishReply = {
  post: Posts;
  comment: string;
};

export const shouldPublishReply = createAppAsyncThunk(
  "post/publishReply",
  async ({ post, comment }: PublishReply, { dispatch }) => {
    const signer = await satlantisClient.getNostrSigner();
    if (signer instanceof Error) {
      throw signer;
    }

    const tags = getReplyTags(post);
    const event = await prepareNostrEvent(signer, {
      kind: NostrKind.TEXT_NOTE,
      tags,
      content: comment.trim(),
    });
    if (event instanceof Error) {
      throw event;
    }

    const response = await satlantisClient.postNote({
      event,
      noteType: post.type,
      parentId: post.id,
    });
    if (response instanceof Error) {
      throw response;
    }

    await dispatch(shouldFetchPost(post.id));
    return response;
  },
);
