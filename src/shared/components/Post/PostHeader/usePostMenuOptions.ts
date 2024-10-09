import * as Clipboard from "expo-clipboard";

import type { ActionMenuOptions } from "src/shared/components/ActionMenu";
type PostMenuOptions = {
  url: string;
  description: string;
  id: number;
  rawContent: string;
  accountNpub: string;
};

const usePostMenuOptions = ({
  url,
  description,
  id,
  rawContent,
  accountNpub,
}: PostMenuOptions) => {
  const MenuOptions: ActionMenuOptions[] = [
    {
      text: "Copy post link",
      onPress: async () => {
        await Clipboard.setStringAsync(url);
      },
      icon: {
        type: "Feather",
        name: "link",
      },
    },
    {
      text: "Copy post text",
      onPress: async () => {
        await Clipboard.setStringAsync(description);
      },
      icon: {
        type: "AntDesign",
        name: "filetext1",
      },
    },
    {
      text: "Copy post ID",
      onPress: async () => {
        await Clipboard.setStringAsync(id.toString());
      },
      icon: {
        type: "MaterialIcons",
        name: "width-wide",
      },
    },
    {
      text: "Copy raw data",
      onPress: async () => {
        await Clipboard.setStringAsync(rawContent);
      },
      icon: {
        type: "Feather",
        name: "database",
      },
    },
    {
      text: "Copy user npub",
      onPress: async () => {
        await Clipboard.setStringAsync(accountNpub);
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
