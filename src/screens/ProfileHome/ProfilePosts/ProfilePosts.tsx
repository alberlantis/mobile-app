import React, { useMemo, memo } from "react";
import {
  View,
  Image,
  useWindowDimensions,
  StyleSheet,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { SCREENS } from "src/navigation/routes";
import type { SignedNavigationProps } from "src/navigation/SignedStack";
import type { SanitizePosts } from "src/store/Profile/profile.selectors";
import s from "./ProfilePosts.style";
import { normalizeSize } from "src/theme";

interface IListItemProps {
  item: SanitizePosts;
  index: number;
}

const ProfilePosts: React.FC<IListItemProps> = ({ item }) => {
  const navigation = useNavigation<SignedNavigationProps<"ProfileHome">>();
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
        <Pressable
          key={`post-${post.id}-${index}`}
          onPress={() => navigation.navigate(SCREENS.VIEW_POST)}
          style={{
            ...s.postImageContainer,
            marginRight: index !== 2 ? normalizeSize(1.4) : 0,
          }}
        >
          <Image src={post.download_url} style={s.postImage} />
        </Pressable>
      ))}
    </View>
  );
};

export default memo(
  ProfilePosts,
  (prevProps, nextProps) => prevProps.item.id !== nextProps.item.id,
);
