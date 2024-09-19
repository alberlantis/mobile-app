import React, { Fragment } from "react";
import { Image, Dimensions } from "react-native";

import { useImageAssets } from "src/shared/hooks";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";

const Post = () => {
  const { images } = useImageAssets();

  return (
    <Fragment>
      <PostHeader />
      <Image
        source={images.mockPost}
        style={{
          width: "100%",
          height: Dimensions.get("window").width,
        }}
        resizeMode="stretch"
      />
      <PostFooter />
    </Fragment>
  );
};

export default Post;
