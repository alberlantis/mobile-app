import * as Clipboard from "expo-clipboard";
import { useRoute } from "@react-navigation/native";

import { SignedRouteProps } from "src/navigation/SignedStack";
import { useAppSelector, PostsState } from "src/store";
import type { ActionMenuOptions } from "src/shared/components/ActionMenu";
import type { PostsScreens } from "../Post";

const usePostMenuOptions = () => {
  const route = useRoute<SignedRouteProps<PostsScreens>>();
  const { postId } = route.params;
  const post = useAppSelector(PostsState.selectors.selectSinglePost(postId));

  const MenuOptions: ActionMenuOptions[] = [
    {
      text: "Copy post link",
      onPress: async () => {
        if (!post) return;
        await Clipboard.setStringAsync(post.url);
      },
      icon: {
        type: "Feather",
        name: "link",
      },
    },
    {
      text: "Copy post text",
      onPress: async () => {
        if (!post) return;
        await Clipboard.setStringAsync(post.description);
      },
      icon: {
        type: "AntDesign",
        name: "filetext1",
      },
    },
    {
      text: "Copy post ID",
      onPress: async () => {
        if (!post) return;
        await Clipboard.setStringAsync(post.id.toString());
      },
      icon: {
        type: "MaterialIcons",
        name: "width-wide",
      },
    },
    {
      text: "Copy raw data",
      onPress: async () => {
        if (!post) return;
        await Clipboard.setStringAsync(post.event.content);
      },
      icon: {
        type: "Feather",
        name: "database",
      },
    },
    {
      text: "Copy user npub",
      onPress: async () => {
        if (!post) return;
        await Clipboard.setStringAsync(post.account.npub);
      },
      icon: {
        type: "FontAwesome6",
        name: "users-rectangle",
      },
    },
    {
      text: "Hide Post",
      onPress: () => {
        // questions: (can we hide a post?)... i saw on web you are deleting, but is not the same
        // from albert: the concept of "hiding" is not cleared discussed with Product and Backend yet.
      },
      primary: true,
      icon: {
        type: "Feather",
        name: "eye-off",
      },
    },
  ];

  return MenuOptions;
};

export default usePostMenuOptions;
