import * as Font from "expo-font";
import {
  Entypo,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
  Fontisto,
  Octicons,
  SimpleLineIcons,
} from "@expo/vector-icons";

const usePreloadIcons = () => {
  const preloadIcons = async () => {
    await Font.loadAsync({
      // Add other icon fonts here as needed
      ...Entypo.font,
      ...Feather.font,
      ...FontAwesome.font,
      ...Ionicons.font,
      ...MaterialCommunityIcons.font,
      ...AntDesign.font,
      ...Fontisto.font,
      ...Octicons.font,
      ...SimpleLineIcons.font,
    });
  };

  return { preloadIcons };
};

export default usePreloadIcons;
