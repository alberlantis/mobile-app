import React, { useEffect, useState, useCallback } from "react";
import { SafeAreaView } from "react-native";
import * as SplashScreen from "expo-splash-screen";

import s from "./AppInitializer.style";

interface ISplashProps {
  children: React.ReactNode;
}

const AppInitializer: React.FC<ISplashProps> = ({ children }) => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        // Initialize all your assets/clients, fetch all your data here
      } catch (e) {
        console.error("App Initialize failed: ", e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaView
      style={s.container}
      onLayout={onLayoutRootView}
      testID="app-initializer-container-id"
    >
      {children}
    </SafeAreaView>
  );
};

export default AppInitializer;
