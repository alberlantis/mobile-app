import React, { useMemo, memo } from "react";
import { View, Image, useWindowDimensions, StyleSheet } from "react-native";

import type { SanitizePosts } from "src/store/Profile/profile.selectors";
import s from "./ProfilePosts.style";
import { normalizeSize } from "src/theme";

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
          style={{
            ...s.postImage,
            marginRight: index !== 2 ? normalizeSize(1.4) : 0,
          }}
        />
      ))}
    </View>
  );
};

export default memo(
  ProfilePosts,
  (prevProps, nextProps) => prevProps.item.id !== nextProps.item.id,
);
