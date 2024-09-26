import React, { Fragment } from "react";
import { Image } from "react-native";
import { useRoute } from "@react-navigation/native";

import { useAppSelector, PostsState } from "src/store";
import { SignedRouteProps } from "src/navigation/SignedStack";
import { SCREENS } from "src/navigation/routes";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import s from "./Post.style";

export type PostsScreens = typeof SCREENS.VIEW_POST;

const Post = () => {
  const route = useRoute<SignedRouteProps<PostsScreens>>();
  const { postId } = route.params;
  const post = useAppSelector(PostsState.selectors.selectSinglePost(postId));

  if (!post) return;

  return (
    <Fragment>
      <PostHeader />
      <Image
        source={{ uri: post.imageUrl }}
        style={s.imageContainer}
        resizeMode="cover"
      />
      <PostFooter />
    </Fragment>
  );
};

export default Post;
