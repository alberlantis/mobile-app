import type { ActionMenuOptions } from "src/shared/components/ActionMenu";

const usePostMenuOptions = () => {
  const MenuOptions: ActionMenuOptions[] = [
    {
      text: "Copy post link",
      onPress: () => {},
      icon: {
        type: "Feather",
        name: "link",
      },
    },
    {
      text: "Copy post text",
      onPress: () => {},
      icon: {
        type: "AntDesign",
        name: "filetext1",
      },
    },
    {
      text: "Copy post ID",
      onPress: () => {},
      icon: {
        type: "MaterialIcons",
        name: "width-wide",
      },
    },
    {
      text: "Copy raw data",
      onPress: () => {},
      icon: {
        type: "Feather",
        name: "database",
      },
    },
    {
      text: "Copy user npub",
      onPress: () => {},
      icon: {
        type: "FontAwesome6",
        name: "users-rectangle",
      },
    },
    {
      text: "Hide Post",
      onPress: () => {},
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
