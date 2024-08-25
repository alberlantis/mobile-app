import React, { useEffect, useState, useCallback } from "react";
import { SafeAreaView } from "react-native";

import { useSplash, useImageAssets } from "src/shared/hooks";
import s from "./AppInitializer.style";

interface ISplashProps {
  children: React.ReactNode;
}

const AppInitializer: React.FC<ISplashProps> = ({ children }) => {
  const [appIsReady, setAppIsReady] = useState(false);

  const { prepareSplash, hideSplash } = useSplash();
  const { preloadImagesAssets } = useImageAssets();

  useEffect(() => {
    async function initializeApp() {
      try {
        // Initialize all your assets/clients, fetch all your data here
        await prepareSplash();
        await preloadImagesAssets();
      } finally {
        setAppIsReady(true);
      }
    }
    initializeApp();
  }, [prepareSplash, preloadImagesAssets]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await hideSplash();
    }
  }, [appIsReady, hideSplash]);

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
