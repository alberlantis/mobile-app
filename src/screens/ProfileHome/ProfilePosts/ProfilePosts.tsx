import React, { useMemo, memo } from "react";
import { View, Image, useWindowDimensions, StyleSheet } from "react-native";

import type { SanitizePosts } from "src/store/Profile/profile.selectors";
import s from "./ProfilePosts.style";

interface IListItemProps {
  item: SanitizePosts;
  index: number;
}

const ProfilePosts: React.FC<IListItemProps> = ({ item }) => {
  const { width } = useWindowDimensions();
  const imageDimensions = useMemo(() => width / 3, [width]);
  return (
    <View
      style={StyleSheet.compose(s.postRow, {
        width: imageDimensions,
        height: imageDimensions,
      })}
    >
      {item.data.map((post, index) => (
        <Image
          key={`post-${post.id}-${index}`}
          src={post.download_url}
          style={s.postImage}
        />
      ))}
    </View>
  );
};

export default memo(
  ProfilePosts,
  (prevProps, nextProps) => prevProps.item.id !== nextProps.item.id,
);
