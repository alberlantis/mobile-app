import React, { Fragment } from "react";
import { Image } from "react-native";
import { Note } from "@satlantis/api-client";

import { EXPO_PUBLIC_DOMAIN } from "src/shared/constants/env";
import { splitUrlAndText } from "src/utils";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import s from "./Post.style";

interface IPostProps {
  post: {
    itself: Note;
    descendants: Note[];
  };
}

const Post: React.FC<IPostProps> = ({ post }) => {
  const [imageUrl, description] = splitUrlAndText(post.itself.content);
  const url = `${EXPO_PUBLIC_DOMAIN}/p/${post.itself.account.npub}?note=${post.itself.id}`;
  return (
    <Fragment>
      <PostHeader
        name={post.itself.account.name || ""}
        createdAt={post.itself.createdAt}
        id={post.itself.id}
        picture={post.itself.account.picture}
        rawContent={post.itself.content}
        description={description}
        url={url}
        accountNpub={post.itself.account.npub}
      />
      <Image
        source={{ uri: imageUrl }}
        style={s.imageContainer}
        resizeMode="cover"
      />
      <PostFooter
        reactions={post.itself.reactions}
        descendants={post.descendants}
        postId={post.itself.id}
        pubkey={post.itself.pubkey}
        postKind={post.itself.kind}
        nostrId={post.itself.nostrId}
        description={description}
        rawContent={post.itself.content}
        postType={post.itself.type}
        postTags={post.itself.tags}
        createdAt={post.itself.createdAt}
        postSig={post.itself.sig}
      />
    </Fragment>
  );
};

export default Post;
