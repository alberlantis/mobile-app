import React from "react";
import { View } from "react-native";

import { colors } from "src/theme";
import { Header, Post } from "src/shared/components";
import { KeyboardView } from "src/shared/wrappers";
import s from "./ViewPost.style";

const ViewPost = () => {
  return (
    <KeyboardView>
      <View style={s.container}>
        <View style={s.headerContainer}>
          <Header
            backButtonColor={colors.GRAY_BOLD}
            showSharedButton
            shareButtonColor={colors.GRAY_BOLD}
            shareValue="https://profile.info.com"
          />
        </View>
        <Post />
      </View>
    </KeyboardView>
  );
};

export default ViewPost;
