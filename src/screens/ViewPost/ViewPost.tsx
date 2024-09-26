import React from "react";
import { View } from "react-native";

import { SCREENS } from "src/navigation/routes";
import { SignedScreenProps } from "src/navigation/SignedStack";
import { useAppSelector, PostsState } from "src/store";
import { colors } from "src/theme";
import { Header, Post } from "src/shared/components";
import { KeyboardView } from "src/shared/wrappers";
import s from "./ViewPost.style";

const ViewPost: React.FC<SignedScreenProps<typeof SCREENS.VIEW_POST>> = ({
  route,
}) => {
  const { postId } = route.params;
  const post = useAppSelector(PostsState.selectors.selectSinglePost(postId));

  if (!post) return null;

  return (
    <KeyboardView>
      <View style={s.container}>
        <View style={s.headerContainer}>
          <Header
            backButtonColor={colors.GRAY_BOLD}
            showSharedButton
            shareButtonColor={colors.GRAY_BOLD}
            shareValue={post.url}
          />
        </View>
        <Post />
      </View>
    </KeyboardView>
  );
};

export default ViewPost;
