import { Asset } from "expo-asset";

const useImageAssets = () => {
  const images = {
    splash: require("assets/splash/splash.png"),
    logo: require("assets/images/logo.png"),
    // preload more images here
  };

  const preloadImagesAssets = async () => {
    try {
      const allImagesAssets = Object.values(images).map((image) =>
        Asset.loadAsync(image),
      );
      await Promise.all(allImagesAssets);
    } catch (e) {
      console.error("Preload Images Failed: ", e);
    }
  };

  return { images, preloadImagesAssets };
};

export default useImageAssets;
