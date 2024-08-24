import * as SplashScreen from "expo-splash-screen";

const useSplash = () => {
  const prepareSplash = async () => {
    let timeout: NodeJS.Timeout | undefined;
    try {
      await SplashScreen.preventAutoHideAsync();
    } catch (e) {
      console.error("Splash Failed: ", e);
    } finally {
      if (!!timeout) clearTimeout(timeout);
    }
  };

  const hideSplash = async () => {
    await SplashScreen.hideAsync();
  };

  return { prepareSplash, hideSplash };
};

export default useSplash;
