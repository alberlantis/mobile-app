import React, { useEffect } from "react";
import { Image, SafeAreaView, StatusBar } from "react-native";

import type { UnsignedScreenProps } from "src/navigation/UnsignedStack";
import { SCREENS } from "src/navigation/routes";
import s from "./Splash.style";
import { useImageAssets } from "src/shared/hooks";

const Splash: React.FC<UnsignedScreenProps<"Splash">> = ({ navigation }) => {
  const { images } = useImageAssets();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate(SCREENS.ONBOARDING);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [navigation]);

  return (
    <SafeAreaView style={s.container}>
      <StatusBar hidden />
      <Image
        source={images.splash}
        style={s.image}
        resizeMode="cover"
        testID="splash-screen-image-id"
      />
    </SafeAreaView>
  );
};

export default Splash;
