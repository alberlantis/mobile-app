import * as Font from "expo-font";

import satlantisFullGlyphMap from "assets/fonts/config.json";
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
  MaterialIcons,
  FontAwesome6,
  FontAwesome5,
  createIconSet,
} from "@expo/vector-icons";
import { GlyphMap } from "@expo/vector-icons/build/createIconSet";

const satlantisGlyphMap = satlantisFullGlyphMap.glyphs.reduce((acc, glyph) => {
  acc[glyph.css] = glyph.code;
  return acc;
}, {} as GlyphMap<string>);

export const SatlantisIcons = createIconSet(
  satlantisGlyphMap,
  "satlantisIcons",
  require("assets/fonts/satlantis-icons.ttf"),
);

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
      ...MaterialIcons.font,
      ...FontAwesome6.font,
      ...FontAwesome5.font,
      ...SatlantisIcons.font,
    });
  };

  return { preloadIcons };
};

export default usePreloadIcons;
