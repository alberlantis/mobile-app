import { Asset } from "expo-asset";

const useImageAssets = () => {
  const images = {
    splash: require("assets/splash/splash.png"),
    logo: require("assets/images/logo.png"),
    mockUserLandscape: require("mock/profile/landscape-user-profile.png"),
    mockBusinessLandscape: require("mock/profile/landscape-business-profile.png"),
    mockUserAvatar: require("mock/profile/avatar-user.png"),
    mockBusinessAvatar: require("mock/profile/avatar-business.png"),
    mockPost: require("mock/profile/post-mock.png"),
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
