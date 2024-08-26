import * as Font from "expo-font";
import { Entypo, Feather } from "@expo/vector-icons";

const usePreloadIcons = () => {
  const preloadIcons = async () => {
    await Font.loadAsync({
      // Add other icon fonts here as needed
      ...Entypo.font,
      ...Feather.font,
    });
  };

  return { preloadIcons };
};

export default usePreloadIcons;
