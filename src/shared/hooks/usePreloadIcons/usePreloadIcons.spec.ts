import { renderHook, waitFor } from "@testing-library/react-native";
import * as Font from "expo-font";

import usePreloadIcons from "./usePreloadIcons";

jest.mock("expo-font", () => ({
  loadAsync: jest.fn(),
}));
jest.mock("@expo/vector-icons", () => ({
  Entypo: {
    font: {
      entypoIcons: "entypo_font",
    },
  },
  Feather: {
    font: {
      featherIcons: "feather",
    },
  },
  FontAwesome: {
    font: {
      fontAwesomeIcons: "fontAwesome",
    },
  },
  Ionicons: {
    font: {
      inonicIcons: "ionic",
    },
  },
  MaterialCommunityIcons: {
    font: {
      materialCommunityIconsIcons: "materialCommunity",
    },
  },
  AntDesign: {
    font: {
      antDesignIcons: "antDesign",
    },
  },
  Fontisto: {
    font: {
      fontistoIcons: "fontisto",
    },
  },
  Octicons: {
    font: {
      octiconsIcons: "octicons",
    },
  },
  SimpleLineIcons: {
    font: {
      simpleLineIcons: "simpleLineIcons",
    },
  },
}));

describe("usePreloadIcons", () => {
  const runHook = () => {
    const {
      result: {
        current: { preloadIcons },
      },
    } = renderHook(usePreloadIcons);
    return { preloadIcons };
  };

  it("should preload all icons when preloadIcons is called", async () => {
    const { preloadIcons } = runHook();
    await waitFor(() => {
      preloadIcons();
    });

    expect(Font.loadAsync).toHaveBeenCalledTimes(1);
    expect(Font.loadAsync).toHaveBeenCalledWith({
      entypoIcons: "entypo_font",
      featherIcons: "feather",
      fontAwesomeIcons: "fontAwesome",
      inonicIcons: "ionic",
      materialCommunityIconsIcons: "materialCommunity",
      antDesignIcons: "antDesign",
      fontistoIcons: "fontisto",
      octiconsIcons: "octicons",
      simpleLineIcons: "simpleLineIcons",
    });
  });
});
