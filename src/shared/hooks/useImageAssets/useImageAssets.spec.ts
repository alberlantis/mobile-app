import { renderHook } from "@testing-library/react-native";
import { Asset } from "expo-asset";

import useImageAssets from "./useImageAssets";

jest.mock("expo-asset", () => ({
  Asset: {
    loadAsync: jest.fn(),
  },
}));

const consoleErrorSpy = jest
  .spyOn(console, "error")
  .mockImplementation(() => {});

describe("useImageAssets", () => {
  const runHook = () => {
    const {
      result: {
        current: { preloadImagesAssets, images },
      },
    } = renderHook(useImageAssets);
    return { preloadImagesAssets, images };
  };

  it("should preload all images when preloadImagesAssets is called", () => {
    const { images, preloadImagesAssets } = runHook();
    const allImages = Object.values(images).length;

    preloadImagesAssets();

    expect(Asset.loadAsync).toHaveBeenCalledTimes(allImages);
  });

  it("should trigger console error with given error when failed", async () => {
    const error = "Preload Images failed with unknown error";
    (Asset.loadAsync as jest.Mock).mockRejectedValueOnce(error);
    const { preloadImagesAssets } = runHook();
    await preloadImagesAssets();

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Preload Images Failed: ",
      error,
    );
  });

  it("should check all images given are correct", () => {
    const { images } = runHook();
    const imagesNames = Object.keys(images);
    expect(imagesNames).toContain("splash");
  });
});
