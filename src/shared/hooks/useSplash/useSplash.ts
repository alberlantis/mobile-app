import * as SplashScreen from "expo-splash-screen";

const useSplash = () => {
  const prepareSplash = async () => {
    try {
      await SplashScreen.preventAutoHideAsync();
    } catch (e) {
      console.error("Splash Failed: ", e);
    }
  };

  const hideSplash = async () => {
    await SplashScreen.hideAsync();
  };

  return { prepareSplash, hideSplash };
};

export default useSplash;
