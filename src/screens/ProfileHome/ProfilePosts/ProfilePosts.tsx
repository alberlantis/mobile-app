import React, { useMemo } from "react";
import {
  View,
  Image,
  useWindowDimensions,
  StyleSheet,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useImageAssets } from "src/shared/hooks";
import { PostsState } from "src/store";
import { SCREENS } from "src/navigation/routes";
import type { SignedNavigationProps } from "src/navigation/SignedStack";
import s from "./ProfilePosts.style";
import { normalizeSize } from "src/theme";

interface IListItemProps {
  item: PostsState.selectors.Posts[];
  index: number;
}

const ProfilePosts: React.FC<IListItemProps> = ({ item }) => {
  const navigation = useNavigation<SignedNavigationProps<"ProfileHome">>();
  const { width } = useWindowDimensions();
  const imageDimensions = useMemo(() => width / 3, [width]);
  const { images } = useImageAssets();

  return (
    <View
      style={StyleSheet.compose(s.postRow, {
        width: imageDimensions,
        height: imageDimensions,
      })}
    >
      {item.map((post, index) => (
        <Pressable
          key={`post-${post.id}-${index}`}
          onPress={() =>
            navigation.navigate(SCREENS.VIEW_POST, { postId: post.id })
          }
          style={{
            ...s.postImageContainer,
            marginRight: index !== 2 ? normalizeSize(1.4) : 0,
          }}
        >
          <Image
            height={imageDimensions}
            width={imageDimensions}
            src={post.imageUrl}
            style={s.postImage}
            resizeMode="cover"
            resizeMethod="scale"
            defaultSource={images.splash}
          />
        </Pressable>
      ))}
    </View>
  );
};

export default ProfilePosts;
